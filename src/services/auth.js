import { createSupabaseBrowserClient } from "./supabase.js";

function buildGuestState(detail = "משחק אורח זמין תמיד") {
  return {
    status: "guest",
    detail,
    session: null,
    user: null,
    error: null
  };
}

function buildUnavailableState(detail = "Supabase עדיין לא הוגדר") {
  return {
    status: "unavailable",
    detail,
    session: null,
    user: null,
    error: null
  };
}

function buildLoadingState(currentState, detail) {
  return {
    status: "loading",
    detail,
    session: currentState?.session || null,
    user: currentState?.user || null,
    error: null
  };
}

function buildInfoState(status, detail, currentState = null) {
  return {
    status,
    detail,
    session: currentState?.session || null,
    user: currentState?.user || null,
    error: null
  };
}

function buildErrorState(detail, error, currentState = null) {
  return {
    status: "error",
    detail,
    session: currentState?.session || null,
    user: currentState?.user || null,
    error: error || null
  };
}

function getRedirectUrl() {
  const configuredUrl = typeof import.meta.env.VITE_APP_URL === "string"
    ? import.meta.env.VITE_APP_URL.trim()
    : "";

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, "");
  }

  return `${window.location.origin}${window.location.pathname}`;
}

function getAuthUrlParams() {
  const currentUrl = new URL(window.location.href);
  const hashParams = new URLSearchParams(currentUrl.hash.startsWith("#") ? currentUrl.hash.slice(1) : currentUrl.hash);

  return {
    searchParams: currentUrl.searchParams,
    hashParams,
    currentUrl
  };
}

function readAuthFeedbackFromUrl() {
  const { searchParams, hashParams } = getAuthUrlParams();
  return {
    error:
      searchParams.get("error") ||
      hashParams.get("error") ||
      "",
    errorDescription:
      searchParams.get("error_description") ||
      hashParams.get("error_description") ||
      searchParams.get("message") ||
      hashParams.get("message") ||
      ""
  };
}

function clearAuthUrlArtifacts() {
  const { currentUrl, searchParams, hashParams } = getAuthUrlParams();
  const removableSearchKeys = [
    "code",
    "error",
    "error_code",
    "error_description",
    "message",
    "type",
    "token_hash"
  ];
  let didChange = false;

  removableSearchKeys.forEach((key) => {
    if (searchParams.has(key)) {
      currentUrl.searchParams.delete(key);
      didChange = true;
    }
  });

  const hashKeys = [
    "access_token",
    "expires_at",
    "expires_in",
    "provider_token",
    "refresh_token",
    "token_type",
    "type",
    "error",
    "error_code",
    "error_description"
  ];
  const hasAuthHash = hashKeys.some((key) => hashParams.has(key));
  if (hasAuthHash) {
    currentUrl.hash = "";
    didChange = true;
  }

  if (!didChange) return;

  const nextUrl = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
  window.history.replaceState({}, document.title, nextUrl || "/");
}

export function createAuthService() {
  const supabase = createSupabaseBrowserClient();
  const listeners = new Set();
  let state = supabase
    ? buildGuestState("אפשר לשחק כאורח או להתחבר עם Google וקישור קסם")
    : buildUnavailableState();

  const emit = () => {
    listeners.forEach((listener) => listener(state));
  };

  const setState = (nextState) => {
    state = nextState;
    emit();
  };

  const buildAuthedState = (session, detail = "מחובר") => ({
    status: "authenticated",
    detail,
    session,
    user: session?.user || null,
    error: null
  });

  const subscribe = (listener) => {
    listeners.add(listener);
    listener(state);
    return () => listeners.delete(listener);
  };

  const init = async () => {
    if (!supabase) {
      emit();
      return;
    }

    const authUrlFeedback = readAuthFeedbackFromUrl();
    const {
      data: { session },
      error
    } = await supabase.auth.getSession();

    if (error) {
      setState(buildErrorState("שחזור החיבור נכשל, אפשר להמשיך כאורח", error));
      clearAuthUrlArtifacts();
      return;
    }

    if (session) {
      setState(buildAuthedState(session, "החשבון מוכן ואפשר להמשיך לשחק"));
      clearAuthUrlArtifacts();
    } else if (authUrlFeedback.errorDescription || authUrlFeedback.error) {
      setState(
        buildErrorState(
          authUrlFeedback.errorDescription || "ההתחברות לא הושלמה",
          authUrlFeedback.error || null
        )
      );
      clearAuthUrlArtifacts();
    } else {
      setState(buildGuestState("אפשר לשחק כאורח או להתחבר"));
    }

    supabase.auth.onAuthStateChange((event, nextSession) => {
      if (nextSession) {
        setState(
          buildAuthedState(
            nextSession,
            event === "TOKEN_REFRESHED" ? "החיבור נשמר ברקע" : "מחובר"
          )
        );
        clearAuthUrlArtifacts();
        return;
      }

      if (event === "SIGNED_OUT") {
        setState(buildGuestState("חזרת למשחק אורח"));
        clearAuthUrlArtifacts();
        return;
      }

      setState(buildGuestState("אפשר לשחק כאורח או להתחבר"));
    });
  };

  const signInWithGoogle = async () => {
    if (!supabase) {
      setState(buildUnavailableState("Supabase לא הוגדר עדיין"));
      return { ok: false, reason: "missing_supabase" };
    }

    setState(buildLoadingState(state, "מעביר ל-Google..."));
    const redirectTo = getRedirectUrl();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo
      }
    });

    if (error) {
      setState(buildErrorState("החיבור עם Google נכשל", error));
      return { ok: false, error };
    }

    return { ok: true };
  };

  const signInWithMagicLink = async (email) => {
    if (!supabase) {
      setState(buildUnavailableState("Supabase לא הוגדר עדיין"));
      return { ok: false, reason: "missing_supabase" };
    }

    if (!email) {
      setState(buildErrorState("יש להזין מייל תקין כדי לשלוח קישור", null, state));
      return { ok: false, reason: "missing_email" };
    }

    setState(buildLoadingState(state, "שולח קישור כניסה..."));
    const emailRedirectTo = getRedirectUrl();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo
      }
    });

    if (error) {
      setState(buildErrorState("שליחת קישור הקסם נכשלה", error, state));
      return { ok: false, error };
    }

    setState(buildInfoState("magic-link-sent", "שלחנו קישור כניסה למייל", state));
    return { ok: true };
  };

  const signOut = async () => {
    if (!supabase) {
      setState(buildGuestState("חזרת למצב אורח"));
      return { ok: true };
    }

    setState(buildLoadingState(state, "מנתק את החשבון..."));
    const { error } = await supabase.auth.signOut();
    if (error) {
      setState(buildErrorState("היציאה נכשלה", error, state));
      return { ok: false, error };
    }

    setState(buildGuestState("חזרת למשחק אורח"));
    return { ok: true };
  };

  return {
    getState: () => state,
    hasSupabase: () => Boolean(supabase),
    init,
    subscribe,
    signInWithGoogle,
    signInWithMagicLink,
    signOut
  };
}
