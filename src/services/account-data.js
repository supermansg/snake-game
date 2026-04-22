import { createSupabaseBrowserClient } from "./supabase.js";

const DEFAULT_SETTINGS = {
  difficulty: "medium",
  theme: "neon",
  snake_skin: "classic",
  control_layout: "classic",
  control_size: "medium",
  control_side: "center",
  audio_muted: false,
  gadget_tips_disabled: false,
  reduced_motion: false,
  board_background_source: null
};

const DEFAULT_PROGRESS = {
  xp: 0,
  level: 1,
  best_score: 0,
  best_level: 1,
  total_runs: 0,
  total_score: 0,
  total_fruit: 0,
  total_enemy_kills: 0,
  total_obstacle_breaks: 0,
  total_pickups: 0,
  total_portals: 0,
  total_shots: 0,
  total_play_seconds: 0,
  achievements: {}
};

function clampInteger(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, Math.round(numeric));
}

function sanitizeBoardBackgroundSource(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.startsWith("data:")) return null;
  return trimmed;
}

function sanitizeSettings(settings = {}) {
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
    difficulty: typeof settings.difficulty === "string" ? settings.difficulty : DEFAULT_SETTINGS.difficulty,
    theme: typeof settings.theme === "string" ? settings.theme : DEFAULT_SETTINGS.theme,
    snake_skin: typeof settings.snake_skin === "string" ? settings.snake_skin : DEFAULT_SETTINGS.snake_skin,
    control_layout: typeof settings.control_layout === "string" ? settings.control_layout : DEFAULT_SETTINGS.control_layout,
    control_size: typeof settings.control_size === "string" ? settings.control_size : DEFAULT_SETTINGS.control_size,
    control_side: typeof settings.control_side === "string" ? settings.control_side : DEFAULT_SETTINGS.control_side,
    audio_muted: Boolean(settings.audio_muted),
    gadget_tips_disabled: Boolean(settings.gadget_tips_disabled),
    reduced_motion: Boolean(settings.reduced_motion),
    board_background_source: sanitizeBoardBackgroundSource(settings.board_background_source)
  };
}

function sanitizeAchievements(achievements) {
  return achievements && typeof achievements === "object" && !Array.isArray(achievements)
    ? achievements
    : {};
}

function sanitizeProgress(progress = {}) {
  return {
    ...DEFAULT_PROGRESS,
    ...progress,
    xp: clampInteger(progress.xp, DEFAULT_PROGRESS.xp),
    level: Math.max(1, clampInteger(progress.level, DEFAULT_PROGRESS.level)),
    best_score: clampInteger(progress.best_score, DEFAULT_PROGRESS.best_score),
    best_level: Math.max(1, clampInteger(progress.best_level, DEFAULT_PROGRESS.best_level)),
    total_runs: clampInteger(progress.total_runs, DEFAULT_PROGRESS.total_runs),
    total_score: clampInteger(progress.total_score, DEFAULT_PROGRESS.total_score),
    total_fruit: clampInteger(progress.total_fruit, DEFAULT_PROGRESS.total_fruit),
    total_enemy_kills: clampInteger(progress.total_enemy_kills, DEFAULT_PROGRESS.total_enemy_kills),
    total_obstacle_breaks: clampInteger(progress.total_obstacle_breaks, DEFAULT_PROGRESS.total_obstacle_breaks),
    total_pickups: clampInteger(progress.total_pickups, DEFAULT_PROGRESS.total_pickups),
    total_portals: clampInteger(progress.total_portals, DEFAULT_PROGRESS.total_portals),
    total_shots: clampInteger(progress.total_shots, DEFAULT_PROGRESS.total_shots),
    total_play_seconds: clampInteger(progress.total_play_seconds, DEFAULT_PROGRESS.total_play_seconds),
    achievements: sanitizeAchievements(progress.achievements)
  };
}

function sanitizeRunHistoryEntry(entry = {}) {
  return {
    score: clampInteger(entry.score, 0),
    level: Math.max(1, clampInteger(entry.level, 1)),
    duration_ms: clampInteger(entry.duration_ms, 0),
    xp_earned: clampInteger(entry.xp_earned, 0),
    difficulty: typeof entry.difficulty === "string" && entry.difficulty.trim() ? entry.difficulty.trim() : "בינוני"
  };
}

function sanitizeRecentRun(entry = {}) {
  return {
    id: typeof entry.id === "string" ? entry.id : "",
    ...sanitizeRunHistoryEntry(entry),
    created_at: typeof entry.created_at === "string" ? entry.created_at : ""
  };
}

export function createAccountDataService() {
  const supabase = createSupabaseBrowserClient();

  async function fetchSingle(table, column, userId) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq(column, userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async function fetchRecentRuns(userId) {
    const { data, error } = await supabase
      .from("run_history")
      .select("id, score, level, duration_ms, xp_earned, difficulty, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) throw error;
    return Array.isArray(data) ? data.map((entry) => sanitizeRecentRun(entry)) : [];
  }

  async function ensureAccountRows(userId, seed = {}) {
    if (!supabase || !userId) return null;

    const settings = sanitizeSettings(seed.settings);
    const progress = sanitizeProgress();
    const profileRow = {
      id: userId,
      display_name: typeof seed.display_name === "string" && seed.display_name.trim()
        ? seed.display_name.trim()
        : null
    };

    const requests = [
      supabase.from("profiles").upsert(profileRow, {
        onConflict: "id",
        ignoreDuplicates: true
      }),
      supabase.from("user_settings").upsert({
        user_id: userId,
        ...settings
      }, {
        onConflict: "user_id",
        ignoreDuplicates: true
      }),
      supabase.from("user_progress").upsert({
        user_id: userId,
        ...progress
      }, {
        onConflict: "user_id",
        ignoreDuplicates: true
      })
    ];

    const results = await Promise.all(requests);
    const firstError = results.find((result) => result.error)?.error || null;
    if (firstError) throw firstError;
    return true;
  }

  return {
    hasSupabase: () => Boolean(supabase),
    getDefaultSettings: () => ({ ...DEFAULT_SETTINGS }),
    getDefaultProgress: () => ({ ...DEFAULT_PROGRESS }),
    sanitizeSettings,
    sanitizeProgress,
    fetchRecentRuns,
    async fetchAccountBundle(userId) {
      if (!supabase || !userId) {
        return {
          profile: null,
          settings: { ...DEFAULT_SETTINGS },
          progress: { ...DEFAULT_PROGRESS },
          recentRuns: []
        };
      }

      const [profile, settings, progress] = await Promise.all([
        fetchSingle("profiles", "id", userId),
        fetchSingle("user_settings", "user_id", userId),
        fetchSingle("user_progress", "user_id", userId)
      ]);
      let recentRuns = [];
      try {
        recentRuns = await fetchRecentRuns(userId);
      } catch {
        recentRuns = [];
      }

      return {
        profile,
        settings: sanitizeSettings(settings || {}),
        progress: sanitizeProgress(progress || {}),
        recentRuns
      };
    },
    ensureAccountRows,
    async upsertProfile(userId, profile = {}) {
      if (!supabase || !userId) return null;

      const row = {
        id: userId,
        display_name: typeof profile.display_name === "string" && profile.display_name.trim()
          ? profile.display_name.trim()
          : null
      };

      const { data, error } = await supabase
        .from("profiles")
        .upsert(row, { onConflict: "id" })
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
    async upsertSettings(userId, settings = {}) {
      if (!supabase || !userId) return null;

      const row = {
        user_id: userId,
        ...sanitizeSettings(settings)
      };

      const { data, error } = await supabase
        .from("user_settings")
        .upsert(row, { onConflict: "user_id" })
        .select("*")
        .single();

      if (error) throw error;
      return sanitizeSettings(data || row);
    },
    async upsertProgress(userId, progress = {}) {
      if (!supabase || !userId) return null;

      const row = {
        user_id: userId,
        ...sanitizeProgress(progress)
      };

      const { data, error } = await supabase
        .from("user_progress")
        .upsert(row, { onConflict: "user_id" })
        .select("*")
        .single();

      if (error) throw error;
      return sanitizeProgress(data || row);
    },
    async insertRunHistory(userId, entry = {}) {
      if (!supabase || !userId) return null;

      const row = {
        user_id: userId,
        ...sanitizeRunHistoryEntry(entry)
      };

      const { data, error } = await supabase
        .from("run_history")
        .insert(row)
        .select("id, score, level, duration_ms, xp_earned, difficulty, created_at")
        .single();

      if (error) throw error;
      return sanitizeRecentRun(data || row);
    }
  };
}
