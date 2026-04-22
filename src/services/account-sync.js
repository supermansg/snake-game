import { createAccountDataService } from "./account-data.js";

function buildBaseState(status, detail) {
  return {
    status,
    detail,
    profile: null,
    settings: null,
    progress: null,
    recentRuns: [],
    userId: "",
    error: null,
    lastHydratedAt: 0,
    lastSettingsSyncAt: 0,
    lastProgressSyncAt: 0
  };
}

function buildGuestState(detail = "שומר נתונים מקומית במצב אורח") {
  return buildBaseState("guest", detail);
}

function buildUnavailableState(detail = "Supabase persistence עדיין לא הוגדר") {
  return buildBaseState("unavailable", detail);
}

export function createAccountSyncService(authService) {
  const accountData = createAccountDataService();
  const listeners = new Set();
  let state = accountData.hasSupabase()
    ? buildGuestState()
    : buildUnavailableState();
  let authUnsubscribe = null;
  let hydrationVersion = 0;
  let initialized = false;
  let runtimeSeedProvider = null;
  let settingsSyncTimeout = null;
  let pendingSettingsPayload = null;

  const emit = () => {
    listeners.forEach((listener) => listener(state));
  };

  const setState = (nextState) => {
    state = nextState;
    emit();
  };

  const getRuntimeSeed = () => {
    if (typeof runtimeSeedProvider !== "function") {
      return {
        display_name: null,
        settings: accountData.getDefaultSettings()
      };
    }

    const seed = runtimeSeedProvider() || {};
    return {
      display_name: typeof seed.display_name === "string" ? seed.display_name : null,
      settings: accountData.sanitizeSettings(seed.settings || {})
    };
  };

  const mergeIntoReadyState = (patch) => {
    setState({
      ...state,
      ...patch,
      status: "ready",
      error: null
    });
  };

  async function hydrateFromCloud(user) {
    if (!accountData.hasSupabase() || !user?.id) {
      setState(buildUnavailableState());
      return;
    }

    const version = ++hydrationVersion;
    setState({
      ...state,
      status: "loading",
      detail: "טוען נתוני חשבון...",
      userId: user.id,
      error: null
    });

    try {
      await accountData.ensureAccountRows(user.id, getRuntimeSeed());
      const bundle = await accountData.fetchAccountBundle(user.id);
      if (version !== hydrationVersion) return;

      setState({
        status: "ready",
        detail: "החשבון מסונכרן",
        profile: bundle.profile,
        settings: bundle.settings,
        progress: bundle.progress,
        recentRuns: bundle.recentRuns,
        userId: user.id,
        error: null,
        lastHydratedAt: Date.now(),
        lastSettingsSyncAt: state.lastSettingsSyncAt || 0,
        lastProgressSyncAt: state.lastProgressSyncAt || 0
      });
    } catch (error) {
      if (version !== hydrationVersion) return;

      setState({
        ...state,
        status: "error",
        detail: "טעינת נתוני החשבון נכשלה, ממשיכים מקומית",
        userId: user.id,
        error,
        recentRuns: []
      });
    }
  }

  function clearPendingSettingsSync() {
    if (!settingsSyncTimeout) return;
    clearTimeout(settingsSyncTimeout);
    settingsSyncTimeout = null;
  }

  async function flushPendingSettingsSync() {
    clearPendingSettingsSync();
    if (!pendingSettingsPayload || state.status !== "ready" || !state.userId) return;

    const nextPayload = pendingSettingsPayload;
    pendingSettingsPayload = null;

    try {
      const savedSettings = await accountData.upsertSettings(state.userId, nextPayload);
      mergeIntoReadyState({
        detail: "הגדרות החשבון מסונכרנות",
        settings: savedSettings,
        lastSettingsSyncAt: Date.now()
      });
    } catch (error) {
      setState({
        ...state,
        detail: "הגדרות החשבון נשמרו מקומית בלבד כרגע",
        error
      });
    }
  }

  async function handleAuthState(nextAuthState) {
    if (!accountData.hasSupabase()) {
      setState(buildUnavailableState());
      return;
    }

    if (nextAuthState.status === "authenticated" && nextAuthState.user) {
      await hydrateFromCloud(nextAuthState.user);
      return;
    }

    hydrationVersion += 1;
    clearPendingSettingsSync();
    pendingSettingsPayload = null;
    setState(buildGuestState("שומר נתונים מקומית במצב אורח"));
  }

  return {
    hasSupabase: () => accountData.hasSupabase(),
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener);
      listener(state);
      return () => listeners.delete(listener);
    },
    setRuntimeSeedProvider(provider) {
      runtimeSeedProvider = provider;
    },
    async init() {
      if (initialized) return;
      initialized = true;

      if (!authService?.subscribe) {
        setState(buildGuestState());
        return;
      }

      authUnsubscribe = authService.subscribe((nextAuthState) => {
        void handleAuthState(nextAuthState);
      });
    },
    async refresh() {
      const authState = authService?.getState?.();
      if (authState?.status === "authenticated" && authState.user) {
        await hydrateFromCloud(authState.user);
      }
    },
    scheduleSettingsSync(settingsPayload) {
      if (!accountData.hasSupabase() || state.status !== "ready" || !state.userId) {
        return Promise.resolve({ ok: false, skipped: true });
      }

      pendingSettingsPayload = accountData.sanitizeSettings(settingsPayload);
      clearPendingSettingsSync();

      return new Promise((resolve) => {
        settingsSyncTimeout = window.setTimeout(async () => {
          await flushPendingSettingsSync();
          resolve({ ok: true });
        }, 280);
      });
    },
    async syncProfile(profilePayload) {
      if (!accountData.hasSupabase() || state.status !== "ready" || !state.userId) {
        return { ok: false, skipped: true };
      }

      try {
        const profile = await accountData.upsertProfile(state.userId, profilePayload);
        mergeIntoReadyState({
          detail: "פרטי החשבון מסונכרנים",
          profile
        });
        return { ok: true, profile };
      } catch (error) {
        setState({
          ...state,
          detail: "עדכון פרטי החשבון נשמר מקומית בלבד כרגע",
          error
        });
        return { ok: false, error };
      }
    },
    async syncProgress(progressPayload, runHistoryEntry = null) {
      if (!accountData.hasSupabase() || state.status !== "ready" || !state.userId) {
        return { ok: false, skipped: true };
      }

      try {
        const progress = await accountData.upsertProgress(state.userId, progressPayload);
        let insertedRun = null;
        let recentRuns = state.recentRuns || [];

        if (runHistoryEntry) {
          try {
            insertedRun = await accountData.insertRunHistory(state.userId, runHistoryEntry);
            recentRuns = [insertedRun, ...recentRuns].slice(0, 5);
          } catch {
            insertedRun = null;
            try {
              recentRuns = await accountData.fetchRecentRuns(state.userId);
            } catch {
              recentRuns = state.recentRuns || [];
            }
          }
        }

        mergeIntoReadyState({
          detail: "התקדמות החשבון מסונכרנת",
          progress,
          recentRuns,
          lastProgressSyncAt: Date.now()
        });

        return { ok: true, progress, recentRun: insertedRun, recentRuns };
      } catch (error) {
        setState({
          ...state,
          detail: "ההתקדמות נשמרה מקומית בלבד כרגע",
          error
        });
        return { ok: false, error };
      }
    },
    destroy() {
      clearPendingSettingsSync();
      pendingSettingsPayload = null;
      authUnsubscribe?.();
      authUnsubscribe = null;
      initialized = false;
    }
  };
}
