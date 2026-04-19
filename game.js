const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const bodyEl = document.body;
const homeScreenEl = document.getElementById("homeScreen");
const homePrimaryBtn = document.getElementById("homePrimaryBtn");
const homeContinueBtn = document.getElementById("homeContinueBtn");
const homeSettingsBtn = document.getElementById("homeSettingsBtn");
const homeProgressBtn = document.getElementById("homeProgressBtn");
const homeAccountBtn = document.getElementById("homeAccountBtn");
const homeHelperTextEl = document.getElementById("homeHelperText");
const homeAccountBadgeEl = document.getElementById("homeAccountBadge");
const homeStatusBadgeEl = document.getElementById("homeStatusBadge");
const toastStackEl = document.getElementById("toastStack");
const appWrapEl = document.querySelector(".wrap");
const topbarEl = document.querySelector(".topbar");
const hudEl = document.querySelector(".hud");
const controlsEl = document.querySelector(".controls");
const boardShellEl = document.getElementById("boardShell");
const footerEl = document.querySelector(".app-footer");
const miniScoreEl = document.getElementById("miniScore");
const miniLevelEl = document.getElementById("miniLevel");
const miniAbilityEl = document.getElementById("miniAbility");
const miniFireBtn = document.getElementById("miniFireBtn");
const miniPauseBtn = document.getElementById("miniPauseBtn");
const miniMenuBtn = document.getElementById("miniMenuBtn");

const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const levelEl = document.getElementById("level");
const hazardsEl = document.getElementById("hazards");
const ammoEl = document.getElementById("ammo");
const statusEl = document.getElementById("status");
const modeLabelEl = document.getElementById("modeLabel");
const abilityLabelEl = document.getElementById("abilityLabel");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");
const fireBtn = document.getElementById("fireBtn");
const menuBtn = document.getElementById("menuBtn");
const recordsBtn = document.getElementById("recordsBtn");
const difficultyButtons = document.querySelectorAll("[data-difficulty]");
const touchControlsEl = document.getElementById("touchControls");
const touchSettingsToggle = document.getElementById("touchSettingsToggle");
const touchSettingsPanel = document.getElementById("touchSettingsPanel");
const touchFireBtn = document.getElementById("touchFireBtn");
const controlLayoutSelect = document.getElementById("controlLayoutSelect");
const controlSizeSelect = document.getElementById("controlSizeSelect");
const controlSideSelect = document.getElementById("controlSideSelect");
const menuControlLayoutSelect = document.getElementById("menuControlLayoutSelect");
const menuControlSizeSelect = document.getElementById("menuControlSizeSelect");
const menuControlSideSelect = document.getElementById("menuControlSideSelect");
const menuTouchPreview = document.getElementById("menuTouchPreview");
const menuPanel = document.getElementById("menuPanel");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const profileNameInput = document.getElementById("profileNameInput");
const themeSelect = document.getElementById("themeSelect");
const snakeSkinSelect = document.getElementById("snakeSkinSelect");
const soundToggle = document.getElementById("soundToggle");
const gadgetTipsToggle = document.getElementById("gadgetTipsToggle");
const reducedMotionToggle = document.getElementById("reducedMotionToggle");
const backgroundUrlInput = document.getElementById("backgroundUrlInput");
const applyBackgroundUrlBtn = document.getElementById("applyBackgroundUrlBtn");
const backgroundFileInput = document.getElementById("backgroundFileInput");
const clearBackgroundBtn = document.getElementById("clearBackgroundBtn");
const backgroundPreviewEl = document.getElementById("backgroundPreview");
const backgroundStatusEl = document.getElementById("backgroundStatus");
const gadgetHelpPanel = document.getElementById("gadgetHelpPanel");
const gadgetHelpTitleEl = document.getElementById("gadgetHelpTitle");
const gadgetHelpDescriptionEl = document.getElementById("gadgetHelpDescription");
const gadgetHelpIconEl = document.getElementById("gadgetHelpIcon");
const gadgetHelpSkipToggle = document.getElementById("gadgetHelpSkipToggle");
const closeGadgetHelpBtn = document.getElementById("closeGadgetHelpBtn");
const leaderboardPanel = document.getElementById("leaderboardPanel");
const closeLeaderboardBtn = document.getElementById("closeLeaderboardBtn");
const playerNameInput = document.getElementById("playerNameInput");
const communityStatusEl = document.getElementById("communityStatus");
const localLeaderboardListEl = document.getElementById("localLeaderboardList");
const globalLeaderboardListEl = document.getElementById("globalLeaderboardList");
const personalBestSummaryEl = document.getElementById("personalBestSummary");
const communityModeBadgeEl = document.getElementById("communityModeBadge");
const recordScorePanel = document.getElementById("recordScorePanel");
const recordScoreSummaryEl = document.getElementById("recordScoreSummary");
const recordPlayerNameInput = document.getElementById("recordPlayerNameInput");
const closeRecordScoreBtn = document.getElementById("closeRecordScoreBtn");
const skipRecordBtn = document.getElementById("skipRecordBtn");
const submitRecordBtn = document.getElementById("submitRecordBtn");
const recordDestinationInputs = document.querySelectorAll('input[name="recordDestination"]');
const playerLevelBadgeEl = document.getElementById("playerLevelBadge");
const playerXpLabelEl = document.getElementById("playerXpLabel");
const playerXpHintEl = document.getElementById("playerXpHint");
const playerXpFillEl = document.getElementById("playerXpFill");
const careerRunsValueEl = document.getElementById("careerRunsValue");
const careerBestLevelValueEl = document.getElementById("careerBestLevelValue");
const careerKillsValueEl = document.getElementById("careerKillsValue");
const careerPickupsValueEl = document.getElementById("careerPickupsValue");
const dailyChallengeDateEl = document.getElementById("dailyChallengeDate");
const dailyChallengeListEl = document.getElementById("dailyChallengeList");
const achievementSummaryEl = document.getElementById("achievementSummary");
const achievementGridEl = document.getElementById("achievementGrid");
const runResultsPanel = document.getElementById("runResultsPanel");
const runResultsTitleEl = document.getElementById("runResultsTitle");
const runResultsLevelBadgeEl = document.getElementById("runResultsLevelBadge");
const runResultsSummaryEl = document.getElementById("runResultsSummary");
const runStatScoreEl = document.getElementById("runStatScore");
const runStatLevelEl = document.getElementById("runStatLevel");
const runStatTimeEl = document.getElementById("runStatTime");
const runStatXpEl = document.getElementById("runStatXp");
const runBreakdownListEl = document.getElementById("runBreakdownList");
const runUnlockListEl = document.getElementById("runUnlockList");
const runMilestoneListEl = document.getElementById("runMilestoneList");
const runResultsMenuBtn = document.getElementById("runResultsMenuBtn");
const runResultsRecordBtn = document.getElementById("runResultsRecordBtn");
const runResultsRestartBtn = document.getElementById("runResultsRestartBtn");
const authPanel = document.getElementById("authPanel");
const closeAuthBtn = document.getElementById("closeAuthBtn");
const guestCloseAuthBtn = document.getElementById("guestCloseAuthBtn");
const googleAuthBtn = document.getElementById("googleAuthBtn");
const magicLinkForm = document.getElementById("magicLinkForm");
const magicLinkEmailInput = document.getElementById("magicLinkEmailInput");
const authStatusMessageEl = document.getElementById("authStatusMessage");
const authSignOutBtn = document.getElementById("authSignOutBtn");
const openAuthBtn = document.getElementById("openAuthBtn");
const menuSignOutBtn = document.getElementById("menuSignOutBtn");
const accountModeBadgeEl = document.getElementById("accountModeBadge");
const accountStatusTextEl = document.getElementById("accountStatusText");
const accountEmailTextEl = document.getElementById("accountEmailText");
const touchButtons = document.querySelectorAll("[data-dir]");
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
const authService = window.SnakeMeServices?.auth || null;

const GRID_SIZE = 21;
const CELL = canvas.width / GRID_SIZE;
const SWIPE_MIN_DISTANCE = 24;
const DOUBLE_TAP_GUARD_MS = 280;
const COMMUNITY_LEADERBOARD_ENDPOINT = window.SNAKE_LEADERBOARD_ENDPOINT || "";
const MAX_PERSONAL_RECORDS = 8;
const MAX_COMMUNITY_RECORDS = 10;

const STORAGE_KEYS = {
  bestScore: "snake_best",
  difficulty: "snake_difficulty",
  theme: "snake_theme",
  snakeSkin: "snake_skin",
  controlLayout: "snake_control_layout",
  controlSize: "snake_control_size",
  controlSide: "snake_control_side",
  playerName: "snake_player_name",
  personalRecords: "snake_personal_records",
  communityFallbackRecords: "snake_community_fallback_records",
  boardBackground: "snake_board_background",
  audioMuted: "snake_audio_muted",
  gadgetTipsDisabled: "snake_gadget_tips_disabled",
  gadgetTipsSeen: "snake_gadget_tips_seen",
  progressionProfile: "snake_progression_profile",
  dailyChallenges: "snake_daily_challenges",
  reducedMotion: "snake_reduced_motion"
};

const DEFAULT_BOARD_BACKGROUND = "/assets/ui/default-board-bg.svg";

const DIFFICULTY_PRESETS = {
  easy: {
    label: "קל",
    baseSpeedMs: 172,
    minSpeedMs: 84,
    speedScoreFactor: 3,
    speedLevelFactor: 2,
    scorePerLevel: 5,
    initialObstacles: 1,
    obstaclePerLevel: 1,
    extraObstacleEvery: 5,
    enemySpawnEvery: 4,
    maxEnemies: 3,
    extraEnemyChance: 0,
    enemyMoveBaseInterval: 5,
    enemyMoveMinInterval: 2,
    pickupEvery: 2,
    pickupChance: 0.92,
    portalLevelEvery: 3
  },
  medium: {
    label: "בינוני",
    baseSpeedMs: 148,
    minSpeedMs: 64,
    speedScoreFactor: 4,
    speedLevelFactor: 3,
    scorePerLevel: 4,
    initialObstacles: 2,
    obstaclePerLevel: 1,
    extraObstacleEvery: 3,
    enemySpawnEvery: 2,
    maxEnemies: 5,
    extraEnemyChance: 0.05,
    enemyMoveBaseInterval: 4,
    enemyMoveMinInterval: 1,
    pickupEvery: 2,
    pickupChance: 0.8,
    portalLevelEvery: 3
  },
  hard: {
    label: "קשה",
    baseSpeedMs: 126,
    minSpeedMs: 52,
    speedScoreFactor: 5,
    speedLevelFactor: 4,
    scorePerLevel: 3,
    initialObstacles: 3,
    obstaclePerLevel: 2,
    extraObstacleEvery: 2,
    enemySpawnEvery: 1,
    maxEnemies: 7,
    extraEnemyChance: 0.24,
    enemyMoveBaseInterval: 3,
    enemyMoveMinInterval: 1,
    pickupEvery: 3,
    pickupChance: 0.74,
    portalLevelEvery: 2
  }
};

const BACKGROUND_THEMES = {
  neon: {
    label: "ניאון גריד",
    unlockLevel: 1,
    boardTop: "#151f35",
    boardMid: "#0f1628",
    boardBottom: "#0a101d",
    gridRGB: "92, 120, 188",
    vignetteRGB: "6, 10, 20",
    boardGlow: "rgba(81, 121, 255, 0.16)",
    foodAura: "rgba(247, 126, 115, 0.25)",
    foodCore: "#ff7e72",
    foodHighlight: "#ffe6ac",
    foodLeaf: "#86db8c",
    obstacleFillRGB: "94, 120, 170",
    obstacleStroke: "#84a0d7",
    obstacleAccent: "rgba(215, 230, 255, 0.16)",
    enemyAura: "rgba(255, 126, 85, 0.35)",
    enemyCore: "#ff8b61",
    enemySpike: "#ffd39b",
    burstRGB: "255, 198, 112",
    overlayRGB: "8, 12, 22"
  },
  aurora: {
    label: "זוהר אורורה",
    unlockLevel: 1,
    boardTop: "#132735",
    boardMid: "#122233",
    boardBottom: "#0a1622",
    gridRGB: "92, 164, 178",
    vignetteRGB: "5, 15, 18",
    boardGlow: "rgba(82, 210, 177, 0.14)",
    foodAura: "rgba(245, 177, 79, 0.2)",
    foodCore: "#f9b85a",
    foodHighlight: "#fff0ba",
    foodLeaf: "#a8ecba",
    obstacleFillRGB: "85, 133, 137",
    obstacleStroke: "#9bd6ca",
    obstacleAccent: "rgba(220, 255, 250, 0.14)",
    enemyAura: "rgba(241, 108, 108, 0.34)",
    enemyCore: "#ff7268",
    enemySpike: "#ffe0ab",
    burstRGB: "136, 244, 208",
    overlayRGB: "6, 20, 22"
  },
  eclipse: {
    label: "ליבת לילה",
    unlockLevel: 4,
    boardTop: "#1a1831",
    boardMid: "#13122a",
    boardBottom: "#090917",
    gridRGB: "138, 117, 205",
    vignetteRGB: "8, 7, 20",
    boardGlow: "rgba(177, 116, 255, 0.16)",
    foodAura: "rgba(255, 132, 132, 0.2)",
    foodCore: "#ff907f",
    foodHighlight: "#ffe3bb",
    foodLeaf: "#a4f1bc",
    obstacleFillRGB: "102, 99, 163",
    obstacleStroke: "#b4b4ff",
    obstacleAccent: "rgba(237, 228, 255, 0.14)",
    enemyAura: "rgba(255, 124, 184, 0.3)",
    enemyCore: "#ff7bc7",
    enemySpike: "#ffe5b1",
    burstRGB: "218, 136, 255",
    overlayRGB: "9, 8, 20"
  }
};

const PICKUP_STYLES = {
  shield: {
    fill: "#78ddff",
    glow: "rgba(120, 221, 255, 0.22)",
    label: "S"
  },
  blaster: {
    fill: "#c58eff",
    glow: "rgba(197, 142, 255, 0.22)",
    label: "B"
  },
  slow: {
    fill: "#82ebb7",
    glow: "rgba(130, 235, 183, 0.22)",
    label: "T"
  }
};

const GADGET_HELP = {
  shield: {
    title: "ליבת מגן",
    icon: "S",
    description:
      "המגן שומר עליך מפגיעה אחת. אם תפגע בקיר, במכשול או באויב פעם אחת, הריצה תימשך והמגן יישבר במקום שהמשחק יסתיים."
  },
  blaster: {
    title: "תא בלסטר",
    icon: "B",
    description:
      "הבלסטר נותן לך מטענים לכפתור הירי. אפשר להשתמש בו כדי לחסל את האויב הקרוב ביותר ולפנות מקום כשהלוח נהיה צפוף."
  },
  slow: {
    title: "שדה זמן",
    icon: "T",
    description:
      "שדה הזמן מאט את תנועת האויבים לכמה שניות. הכי טוב להשתמש בו כשכמות האיומים גדלה ואתה צריך נתיב בטוח יותר לפרי הבא."
  }
};

const SNAKE_SKINS = {
  classic: {
    label: "ירוק קלאסי",
    unlockLevel: 1,
    head: "#54e3a5",
    body: "#2fc487",
    eye: "#082a1e",
    headGlow: "rgba(84, 227, 165, 0.26)",
    bodyGlow: "rgba(47, 196, 135, 0.14)",
    highlight: "rgba(222, 255, 241, 0.32)"
  },
  cobalt: {
    label: "כחול קובלט",
    unlockLevel: 1,
    head: "#77b2ff",
    body: "#4c8fff",
    eye: "#0b1d3b",
    headGlow: "rgba(119, 178, 255, 0.24)",
    bodyGlow: "rgba(76, 143, 255, 0.14)",
    highlight: "rgba(230, 242, 255, 0.28)"
  },
  ember: {
    label: "גחלת פלזמה",
    unlockLevel: 6,
    head: "#ffb173",
    body: "#ff7d63",
    eye: "#38150d",
    headGlow: "rgba(255, 177, 115, 0.26)",
    bodyGlow: "rgba(255, 125, 99, 0.16)",
    highlight: "rgba(255, 240, 219, 0.3)"
  }
};

const CONTROL_LAYOUT_PRESETS = {
  classic: {
    layout: "classic"
  },
  compact: {
    layout: "compact"
  },
  wide: {
    layout: "wide"
  }
};

const CONTROL_SIZE_PRESETS = {
  small: {
    size: "small"
  },
  medium: {
    size: "medium"
  },
  large: {
    size: "large"
  }
};

const CONTROL_SIDE_PRESETS = {
  left: {
    side: "left"
  },
  center: {
    side: "center"
  },
  right: {
    side: "right"
  }
};

const ACHIEVEMENT_DEFS = [
  {
    id: "first_bite",
    title: "ביס ראשון",
    description: "אכול את הפרי הראשון שלך",
    check: (profile) => profile.totalFruit >= 1
  },
  {
    id: "arcade_runner",
    title: "רץ ארקייד",
    description: "השלם 5 ריצות",
    check: (profile) => profile.totalRuns >= 5
  },
  {
    id: "hazard_hunter",
    title: "צייד איומים",
    description: "חסל 5 אויבים עם בלסטר",
    check: (profile) => profile.totalEnemyKills >= 5
  },
  {
    id: "portal_hopper",
    title: "קופץ פורטלים",
    description: "עבר 6 פעמים דרך פורטל",
    check: (profile) => profile.totalPortals >= 6
  },
  {
    id: "gadget_master",
    title: "אוסף גאדג'טים",
    description: "אסוף 10 גאדג'טים",
    check: (profile) => profile.totalPickups >= 10
  },
  {
    id: "stage_breaker",
    title: "פורץ שלבים",
    description: "הגיע לשלב 6 בריצה אחת",
    check: (profile) => profile.bestLevel >= 6
  }
];

const DAILY_CHALLENGE_DEFS = [
  {
    id: "score_sprint",
    type: "maxScore",
    title: "ספרינט ניקוד",
    description: (target) => `הגיע לניקוד ${target} בריצה אחת`,
    rewardXp: 80,
    targets: [8, 10, 12]
  },
  {
    id: "pickup_route",
    type: "pickups",
    title: "מסלול גאדג'טים",
    description: (target) => `אסוף ${target} גאדג'טים`,
    rewardXp: 70,
    targets: [2, 3, 4]
  },
  {
    id: "enemy_hunt",
    type: "enemyKills",
    title: "ציד אויבים",
    description: (target) => `חסל ${target} אויבים`,
    rewardXp: 90,
    targets: [2, 3, 4]
  },
  {
    id: "portal_run",
    type: "portals",
    title: "ריצת פורטלים",
    description: (target) => `השתמש ${target} פעמים בפורטל`,
    rewardXp: 60,
    targets: [1, 2, 3]
  },
  {
    id: "play_streak",
    type: "runs",
    title: "רצף ריצות",
    description: (target) => `שחק ${target} ריצות היום`,
    rewardXp: 65,
    targets: [2, 3, 4]
  }
];

const CARDINALS = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 }
];

let snake;
let food;
let obstacles;
let enemies;
let direction;
let nextDirection;
let score;
let level;

let difficulty = normalizeKey(localStorage.getItem(STORAGE_KEYS.difficulty), DIFFICULTY_PRESETS, "medium");
let activeTheme = normalizeKey(localStorage.getItem(STORAGE_KEYS.theme), BACKGROUND_THEMES, "neon");
let activeSkin = normalizeKey(localStorage.getItem(STORAGE_KEYS.snakeSkin), SNAKE_SKINS, "classic");
let preferredControlLayout = normalizeKey(
  localStorage.getItem(STORAGE_KEYS.controlLayout),
  CONTROL_LAYOUT_PRESETS,
  "classic"
);
let preferredControlSize = normalizeKey(
  localStorage.getItem(STORAGE_KEYS.controlSize),
  CONTROL_SIZE_PRESETS,
  "medium"
);
let preferredControlSide = normalizeKey(
  localStorage.getItem(STORAGE_KEYS.controlSide),
  CONTROL_SIDE_PRESETS,
  "center"
);

let bestScore = Number(localStorage.getItem(STORAGE_KEYS.bestScore) || 0);
let currentSpeedMs = DIFFICULTY_PRESETS[difficulty].baseSpeedMs;
let gameTimer = null;
let kickoffTickTimeout = null;
let rafId = null;
let running = false;
let started = false;
let gameOverAt = 0;
let statusTimeout = null;
let foodBurst = null;
let swipeStart = null;
let lastTouchEndAt = 0;
let boardFlash = null;
let boardShakeUntil = 0;
let floatingTexts = [];
let gameOverMessage = "";
let stageBanner = null;
let activePickup = null;
let activePortals = [];
let activeExplosionBursts = [];
let playerPowerState = {
  shield: 0,
  blasterCharges: 3,
  slowUntil: 0
};
let laserShot = null;
let personalRecords = loadPersonalRecords();
let communityFallbackRecords = loadCommunityFallbackRecords();
let communityRecords = [];
let communityStatus = {
  mode: COMMUNITY_LEADERBOARD_ENDPOINT ? "מתחבר" : "דמו לא מקוון",
  detail: COMMUNITY_LEADERBOARD_ENDPOINT
    ? "מתחבר ללוח הקהילתי..."
    : "לוח קהילתי: צד השרת עדיין לא מחובר"
};
let playerName = localStorage.getItem(STORAGE_KEYS.playerName) || "שחקן";
let boardBackgroundSource = localStorage.getItem(STORAGE_KEYS.boardBackground) || "";
let boardBackgroundImage = null;
let boardBackgroundLoaded = false;
let boardBackgroundError = "";
let boardBackgroundResolvedSource = "";
let boardBackgroundSessionOnly = false;
let audioMuted = localStorage.getItem(STORAGE_KEYS.audioMuted) === "1";
let gadgetTipsDisabled = localStorage.getItem(STORAGE_KEYS.gadgetTipsDisabled) === "1";
let seenGadgetTips = loadSeenGadgetTips();
let reducedMotionEnabled = (() => {
  const stored = localStorage.getItem(STORAGE_KEYS.reducedMotion);
  if (stored === "1") return true;
  if (stored === "0") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
})();
let audioContext = null;
let gadgetHelpOpen = false;
let gadgetHelpResumeAfterClose = false;
let activeGadgetHelpType = "";
let pendingScoreEntry = null;
let progressionProfile = loadProgressionProfile();
let dailyChallenges = loadDailyChallenges();
let currentRunStats = createEmptyRunStats();
let lastRunResults = null;
let homeOpen = true;
let authOpen = false;
let resumeCountdown = null;
let authSnapshot = authService?.getState?.() || {
  status: "guest",
  detail: "משחק אורח זמין תמיד",
  user: null,
  session: null
};

bestEl.textContent = String(bestScore);

function getCanContinueRun() {
  return started && gameOverAt === 0 && !running && !resumeCountdown;
}

function hasBlockingOverlayOpen() {
  return Boolean(
    homeOpen ||
      authOpen ||
      (menuPanel && !menuPanel.hidden) ||
      (leaderboardPanel && !leaderboardPanel.hidden) ||
      (recordScorePanel && !recordScorePanel.hidden) ||
      (runResultsPanel && !runResultsPanel.hidden)
  );
}

function applyThemeTokensToDocument() {
  const theme = getThemeConfig();
  if (!theme) return;

  document.documentElement.style.setProperty("--theme-accent", theme.obstacleStroke);
  document.documentElement.style.setProperty("--theme-accent-rgb", theme.gridRGB);
  document.documentElement.style.setProperty("--theme-glow-rgb", theme.burstRGB);
  document.documentElement.style.setProperty("--theme-surface-top", "rgba(18, 27, 45, 0.94)");
  document.documentElement.style.setProperty("--theme-surface-bottom", "rgba(10, 15, 24, 0.92)");
}

function formatAmmoDisplay(count) {
  const ammoCount = Math.max(0, count);
  const icons = "✦".repeat(Math.min(ammoCount, 3)) || "—";
  return `${icons} × ${ammoCount}`;
}

function formatAmmoPips(count) {
  const ammoCount = Math.max(0, count);
  const filled = Math.min(ammoCount, 3);
  const empty = Math.max(0, 3 - filled);
  const overflow = Math.max(0, ammoCount - 3);
  return `${"✦".repeat(filled)}${"·".repeat(empty)}${overflow > 0 ? `+${overflow}` : ""}`;
}

function updateAmmoHud() {
  const ammoCount = Math.max(0, playerPowerState.blasterCharges);
  const ammoDisplay = formatAmmoDisplay(ammoCount);
  const ammoPips = formatAmmoPips(ammoCount);

  if (ammoEl) {
    ammoEl.textContent = ammoDisplay;
    ammoEl.dataset.ammoCount = String(ammoCount);
    ammoEl.dataset.ammoPips = ammoPips;
    ammoEl.parentElement?.setAttribute("data-ammo-pips", ammoPips);
  }

  [fireBtn, touchFireBtn, miniFireBtn].filter(Boolean).forEach((button) => {
    button.dataset.ammoCount = String(ammoCount);
    button.dataset.ammoPips = ammoPips;
    button.dataset.hasAmmo = ammoCount > 0 ? "true" : "false";
  });
}

function updateAuthUI() {
  const isAuthed = authSnapshot.status === "authenticated" && authSnapshot.user;
  const email = authSnapshot.user?.email || "לא מחובר כרגע";
  const displayName =
    authSnapshot.user?.user_metadata?.full_name ||
    authSnapshot.user?.user_metadata?.name ||
    authSnapshot.user?.email ||
    "משחק אורח";

  if (homeAccountBadgeEl) {
    homeAccountBadgeEl.textContent = isAuthed ? "חשבון מחובר" : "משחק אורח";
  }

  if (homeStatusBadgeEl) {
    homeStatusBadgeEl.textContent = getCanContinueRun() ? "אפשר להמשיך ריצה" : "מוכן לריצה חדשה";
  }

  if (homeHelperTextEl) {
    homeHelperTextEl.textContent = isAuthed
      ? `מחובר בתור ${displayName}. המשחק נשאר מהיר, והחשבון כבר מוכן לשמירה וסנכרון עתידיים.`
      : "שחק כאורח מיד או התחבר כדי להכין את הקרקע לשמירה, סנכרון והתקדמות עתידית.";
  }

  if (accountModeBadgeEl) accountModeBadgeEl.textContent = isAuthed ? "מחובר" : "אורח";
  if (accountStatusTextEl) accountStatusTextEl.textContent = authSnapshot.detail || "משחק אורח זמין תמיד";
  if (accountEmailTextEl) accountEmailTextEl.textContent = email;
  if (authStatusMessageEl) {
    authStatusMessageEl.textContent = isAuthed
      ? `מחובר בתור ${displayName}. אפשר להמשיך לשחק בלי לעצור את הזרימה.`
      : authSnapshot.detail || "שחק כאורח מיד, או התחבר כדי להכין פרופיל עתידי.";
  }

  if (menuSignOutBtn) menuSignOutBtn.hidden = !isAuthed;
  if (authSignOutBtn) authSignOutBtn.hidden = !isAuthed;
  if (openAuthBtn) openAuthBtn.textContent = isAuthed ? "נהל התחברות" : "פתח מסך התחברות";
  if (homeAccountBtn) homeAccountBtn.textContent = isAuthed ? "חשבון מחובר" : "חשבון והתחברות";
}

function setHomeOpen(isOpen) {
  homeOpen = Boolean(isOpen);
  if (homeScreenEl) homeScreenEl.hidden = !homeOpen;
  bodyEl?.classList.toggle("home-open", homeOpen);
  updateAuthUI();
  updatePlayLayoutState();
  updateActionButtons();
  focusGameSurface();
}

function setAuthOpen(isOpen) {
  authOpen = Boolean(isOpen);
  if (authPanel) authPanel.hidden = !authOpen;
  if (authOpen && homeOpen) {
    setHomeOpen(false);
  }
  if (authOpen && menuPanel) menuPanel.hidden = true;
  if (authOpen && leaderboardPanel) leaderboardPanel.hidden = true;
  if (authOpen && runResultsPanel) runResultsPanel.hidden = true;
  updatePlayLayoutState();
  updateActionButtons();
  if (!authOpen && started && gameOverAt === 0) focusGameSurface();
}

function focusGameSurface(options = {}) {
  if (!canvas || homeOpen || authOpen) return;

  const focusCanvas = () => {
    if (document.activeElement instanceof HTMLElement && document.activeElement !== canvas) {
      document.activeElement.blur?.();
    }
    try {
      window.focus();
    } catch {
      // Ignore platforms that disallow programmatic window focus.
    }
    try {
      canvas.focus({ preventScroll: true });
    } catch {
      canvas.focus();
    }
  };

  if (options.immediate) {
    focusCanvas();
    return;
  }

  requestAnimationFrame(focusCanvas);
}

function beginResumeCountdown() {
  if (resumeCountdown || running || !started || gameOverAt > 0) return;

  clearStatusTimer();
  resumeCountdown = {
    startedAt: performance.now(),
    totalMs: 3000
  };
  statusEl.textContent = "חוזרים למשחק בעוד 3";
  updateActionButtons();
  focusGameSurface();
}

function maybeCompleteResumeCountdown(nowMs) {
  if (!resumeCountdown) return;

  const elapsed = nowMs - resumeCountdown.startedAt;
  if (elapsed < resumeCountdown.totalMs) return;

  resumeCountdown = null;
  running = true;
  setPlayingStatus();
  runLoop({ kickoff: "resume" });
  updatePlayLayoutState();
  updateActionButtons();
  focusGameSurface({ immediate: true });
}

function getResumeCountdownValue(nowMs) {
  if (!resumeCountdown) return null;
  const remaining = Math.max(0, resumeCountdown.totalMs - (nowMs - resumeCountdown.startedAt));
  return Math.max(1, Math.ceil(remaining / 1000));
}

function drawResumeCountdown(nowMs) {
  const countdownValue = getResumeCountdownValue(nowMs);
  if (!countdownValue) return;

  ctx.save();
  ctx.fillStyle = "rgba(7, 11, 20, 0.66)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawStateOverlay(`חוזרים בעוד ${countdownValue}`, "קח רגע קצר להתמקם לפני שהמשחק ממשיך");
  ctx.restore();
}

async function handleGoogleAuth() {
  if (!authService) return;
  await authService.signInWithGoogle();
}

async function handleMagicLinkSubmit(event) {
  event.preventDefault();
  if (!authService || !magicLinkEmailInput) return;

  const email = magicLinkEmailInput.value.trim();
  if (!email) {
    authSnapshot = {
      ...authSnapshot,
      detail: "יש להזין מייל תקין כדי לשלוח קישור"
    };
    updateAuthUI();
    return;
  }

  await authService.signInWithMagicLink(email);
}

async function handleSignOut() {
  if (!authService) return;
  await authService.signOut();
}

function initGame() {
  const config = getDifficultyConfig();

  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];

  obstacles = [];
  enemies = [];

  for (let i = 0; i < config.initialObstacles; i += 1) {
    spawnObstacle();
  }

  food = createFood();
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  level = 1;
  currentSpeedMs = getCurrentSpeedMs();
  running = false;
  started = false;
  gameOverAt = 0;
  foodBurst = null;
  boardFlash = null;
  boardShakeUntil = 0;
  floatingTexts = [];
  gameOverMessage = "";
  stageBanner = null;
  activePickup = null;
  activePortals = [];
  activeExplosionBursts = [];
  playerPowerState = {
    shield: 0,
    blasterCharges: 3,
    slowUntil: 0
  };
  laserShot = null;
  pendingScoreEntry = null;
  currentRunStats = createEmptyRunStats();
  lastRunResults = null;
  resumeCountdown = null;
  if (runResultsPanel) runResultsPanel.hidden = true;

  clearStatusTimer();
  syncDailyChallenges();
  updateDifficultyButtons();
  applyControlLayout();
  updateTouchControlSettingsUI();
  updateCustomizationUI();
  renderMetaProgressionUI();
  updateModeLabel();
  updateAbilityLabel();
  updatePlayLayoutState();
  renderLeaderboards();
  syncViewportLayout();

  scoreEl.textContent = "0";
  levelEl.textContent = String(level);
  updateHazardsLabel();
  updateAmmoHud();
  statusEl.textContent = getIdleStatus();
  updateMiniHud();

  updateActionButtons();
  stopLoop();
  startRenderLoop();
  draw(performance.now());
}

function startGame() {
  if (running || resumeCountdown) return;

  if (gameOverAt > 0) {
    initGame();
  }

  if (started && !running && gameOverAt === 0) {
    beginResumeCountdown();
    return;
  }

  if (homeOpen) setHomeOpen(false);
  if (!started) started = true;
  if (!currentRunStats.startedAt) currentRunStats.startedAt = performance.now();

  primeAudio();
  gameOverAt = 0;
  running = true;
  setPlayingStatus();
  updatePlayLayoutState();
  updateActionButtons();
  focusGameSurface({ immediate: true });
  runLoop({ kickoff: "fresh" });
}

function startFreshRun(initialDirection = null) {
  initGame();
  if (initialDirection && (initialDirection.x !== -direction.x || initialDirection.y !== -direction.y)) {
    direction = { ...initialDirection };
    nextDirection = { ...initialDirection };
  }
  setHomeOpen(false);
  focusGameSurface({ immediate: true });
  startGame();
}

function handlePrimaryButtonClick() {
  if (gameOverAt > 0) {
    if (pendingScoreEntry) {
      setRecordScoreOpen(true);
    } else {
      skipPendingScoreRecord();
    }
    return;
  }

  if (!started) {
    startFreshRun();
    return;
  }

  startGame();
}

function handleRestartButtonClick() {
  if (gadgetHelpOpen) return;
  startFreshRun();
}

function pauseGame() {
  if (!running && !resumeCountdown) return;

  running = false;
  resumeCountdown = null;
  stopLoop();
  clearStatusTimer();
  statusEl.textContent = "המשחק מושהה";
  updatePlayLayoutState();
  updateActionButtons();
}

function togglePause() {
  if (gameOverAt > 0) return;

  if (!started) {
    startFreshRun();
    return;
  }

  if (running) pauseGame();
  else startGame();
}

function runLoop(options = {}) {
  stopLoop();
  currentSpeedMs = getCurrentSpeedMs();
  if (options.kickoff) {
    const kickoffDelay = options.kickoff === "resume"
      ? Math.max(16, Math.min(32, Math.round(currentSpeedMs * 0.2)))
      : Math.max(110, Math.min(160, Math.round(currentSpeedMs * 0.9)));
    kickoffTickTimeout = setTimeout(() => {
      kickoffTickTimeout = null;
      tick();
    }, kickoffDelay);
  }
  gameTimer = setInterval(tick, currentSpeedMs);
}

function stopLoop() {
  if (kickoffTickTimeout) {
    clearTimeout(kickoffTickTimeout);
    kickoffTickTimeout = null;
  }
  if (!gameTimer) return;
  clearInterval(gameTimer);
  gameTimer = null;
}

function tick() {
  if (!running) return;

  direction = nextDirection;

  const head = snake[0];
  const candidateHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  };
  const newHead = resolvePortalTravel(candidateHead);
  const willEat = isFoodCell(newHead);

  if (isWallCollision(newHead)) {
    if (!tryUseShield("המגן ספג את הפגיעה")) gameOver("התנגשות בקיר");
    return;
  }

  if (isSelfCollision(newHead, willEat)) {
    if (!tryUseShield("המגן הציל את הריצה")) gameOver("פגעת בעצמך");
    return;
  }

  if (isObstacleCollision(newHead)) {
    if (!tryUseShield("המגן נשבר מהפגיעה")) gameOver("התנגשות במכשול");
    return;
  }

  if (isEnemyCollision(newHead)) {
    if (!tryUseShield("המגן הדף את האויב")) {
      gameOver("התנגשות באויב");
    } else {
      enemies = enemies.filter((enemy) => !(enemy.x === newHead.x && enemy.y === newHead.y));
      updateHazardsLabel();
    }
    return;
  }

  snake.unshift(newHead);

  if (activePickup && newHead.x === activePickup.x && newHead.y === activePickup.y) {
    collectPickup(activePickup);
    activePickup = null;
  }

  if (willEat) {
    score += 1;
    currentRunStats.fruits += 1;
    scoreEl.textContent = String(score);

    if (score > bestScore) {
      bestScore = score;
      bestEl.textContent = String(bestScore);
      localStorage.setItem(STORAGE_KEYS.bestScore, String(bestScore));
    }

    foodBurst = {
      x: newHead.x,
      y: newHead.y,
      start: performance.now()
    };
    triggerBoardFlash("eat");
    playSound("eat");
    addFloatingText("+1", newHead.x, newHead.y, "#ffd36d");

    food = createFood();
    maybeSpawnPickup();
  } else {
    snake.pop();
  }

  moveEnemies();

  if (isEnemyTouchingSnake()) {
    if (!tryUseShield("המגן הדף את האויב")) {
      gameOver("אויב תפס אותך");
      return;
    }
    enemies = enemies.filter(
      (enemy) => !snake.some((segment) => segment.x === enemy.x && segment.y === enemy.y)
    );
    updateHazardsLabel();
    return;
  }

  updateLevel();
  updateHazardsLabel();
  updateSpeedIfNeeded();
  maybeSpawnPortals();
  updateAbilityLabel();
  updateActionButtons();
}

function isWallCollision(pos) {
  return pos.x < 0 || pos.x >= GRID_SIZE || pos.y < 0 || pos.y >= GRID_SIZE;
}

function isSelfCollision(pos, includeTail = true) {
  const tailIndex = snake.length - 1;
  return snake.some((segment, index) => {
    if (!includeTail && index === tailIndex) return false;
    return segment.x === pos.x && segment.y === pos.y;
  });
}

function isObstacleCollision(pos) {
  return obstacles.some((obstacle) => obstacle.x === pos.x && obstacle.y === pos.y);
}

function isEnemyCollision(pos) {
  return enemies.some((enemy) => enemy.x === pos.x && enemy.y === pos.y);
}

function isEnemyTouchingSnake() {
  return enemies.some((enemy) =>
    snake.some((segment) => segment.x === enemy.x && segment.y === enemy.y)
  );
}

function gameOver(message) {
  running = false;
  gameOverAt = performance.now();
  gameOverMessage = message;
  pendingScoreEntry = score > 0 ? buildScoreEntry() : null;
  finalizeRunProgress(message);
  clearStatusTimer();
  stopLoop();
  playSound("fail");
  statusEl.textContent = pendingScoreEntry
    ? `${message}. אפשר לבחור ריצה חדשה או לתעד את השיא`
    : `${message}. אפשר לבחור ריצה חדשה או לחזור לתפריט`;
  triggerBoardFlash("danger");
  boardShakeUntil = performance.now() + 280;
  setRunResultsOpen(true);
  updatePlayLayoutState();
  updateActionButtons();
}

function createFood() {
  for (let attempts = 0; attempts < 300; attempts += 1) {
    const candidate = {
      x: randomInt(0, GRID_SIZE - 1),
      y: randomInt(0, GRID_SIZE - 1)
    };

    if (!isBlockedCell(candidate) && !isReservedSpawnCell(candidate)) return candidate;
  }

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const fallback = { x, y };
      if (!isBlockedCell(fallback) && !isReservedSpawnCell(fallback)) return fallback;
    }
  }

  return { x: 0, y: 0 };
}

function isBlockedCell(pos) {
  return (
    snake.some((segment) => segment.x === pos.x && segment.y === pos.y) ||
    isObstacleCollision(pos) ||
    isEnemyCollision(pos)
  );
}

function isReservedSpawnCell(pos) {
  return (
    isPickupCell(pos) ||
    isPortalCell(pos) ||
    isFoodCell(pos)
  );
}

function spawnObstacle() {
  const head = snake[0];

  for (let attempts = 0; attempts < 500; attempts += 1) {
    const candidate = {
      x: randomInt(0, GRID_SIZE - 1),
      y: randomInt(0, GRID_SIZE - 1),
      phase: Math.random() * Math.PI * 2
    };

    const nearHead = Math.abs(candidate.x - head.x) + Math.abs(candidate.y - head.y) < 4;

    if (!nearHead && !isBlockedCell(candidate) && !isFoodCell(candidate)) {
      obstacles.push(candidate);
      return true;
    }
  }

  return false;
}

function spawnEnemy() {
  const head = snake[0];

  for (let attempts = 0; attempts < 500; attempts += 1) {
    const candidate = {
      x: randomInt(0, GRID_SIZE - 1),
      y: randomInt(0, GRID_SIZE - 1),
      cooldown: randomInt(1, 3),
      phase: Math.random() * Math.PI * 2
    };

    const nearHead = Math.abs(candidate.x - head.x) + Math.abs(candidate.y - head.y) < 7;

    if (!nearHead && !isBlockedCell(candidate) && !isFoodCell(candidate)) {
      enemies.push(candidate);
      return true;
    }
  }

  return false;
}

function isFoodCell(pos) {
  return food && pos.x === food.x && pos.y === food.y;
}

function isPickupCell(pos) {
  return activePickup && activePickup.x === pos.x && activePickup.y === pos.y;
}

function isPortalCell(pos) {
  return activePortals.some((portal) => portal.x === pos.x && portal.y === pos.y);
}

function resolvePortalTravel(pos) {
  if (activePortals.length !== 2) return pos;
  const source = activePortals.find((portal) => portal.x === pos.x && portal.y === pos.y);
  if (!source) return pos;
  const destination = activePortals.find((portal) => portal.id !== source.id);
  if (!destination) return pos;

  source.charges -= 1;
  destination.charges -= 1;
  if (source.charges <= 0 || destination.charges <= 0) {
    activePortals = [];
  }
  currentRunStats.portals += 1;
  triggerBoardFlash("portal");
  playSound("portal");
  addFloatingText("קפיצה", pos.x, pos.y, "#9cc7ff");
  return { x: destination.x, y: destination.y };
}

function moveEnemies() {
  if (enemies.length === 0) return;

  const config = getDifficultyConfig();
  const head = snake[0];
  const slowActive = performance.now() < playerPowerState.slowUntil;
  const moveInterval = Math.max(
    config.enemyMoveMinInterval,
    config.enemyMoveBaseInterval - Math.floor(level / 3) + (slowActive ? 2 : 0)
  );

  for (let i = 0; i < enemies.length; i += 1) {
    const enemy = enemies[i];
    enemy.cooldown -= 1;
    if (enemy.cooldown > 0) continue;

    enemy.cooldown = moveInterval;
    const options = getEnemyMoveOptions(enemy, head);

    for (let j = 0; j < options.length; j += 1) {
      const candidate = {
        x: enemy.x + options[j].x,
        y: enemy.y + options[j].y
      };

      if (isWallCollision(candidate)) continue;
      if (isObstacleCollision(candidate)) continue;
      if (isEnemyCollisionExcept(candidate, i)) continue;

      enemy.x = candidate.x;
      enemy.y = candidate.y;
      break;
    }
  }
}

function getEnemyMoveOptions(enemy, head) {
  const dx = Math.sign(head.x - enemy.x);
  const dy = Math.sign(head.y - enemy.y);
  const preferred = [];

  if (dx !== 0) preferred.push({ x: dx, y: 0 });
  if (dy !== 0) preferred.push({ x: 0, y: dy });

  shuffleInPlace(preferred);
  const fallback = shuffleCopy(CARDINALS);

  if (Math.random() < 0.28) {
    return [...fallback, ...preferred];
  }

  return [...preferred, ...fallback];
}

function isEnemyCollisionExcept(pos, enemyIndex) {
  return enemies.some(
    (enemy, idx) => idx !== enemyIndex && enemy.x === pos.x && enemy.y === pos.y
  );
}

function updateLevel() {
  const config = getDifficultyConfig();
  const nextLevel = 1 + Math.floor(score / config.scorePerLevel);
  if (nextLevel <= level) return;

  while (level < nextLevel) {
    level += 1;
    currentRunStats.maxLevel = Math.max(currentRunStats.maxLevel, level);
    applyLevelDifficulty(level);
  }

  levelEl.textContent = String(level);
  stageBanner = {
    title: `שלב ${level}`,
    subtitle: "כמות האיומים עלתה",
    color: "rgba(120, 174, 255, 0.92)",
    start: performance.now(),
    duration: reducedMotionEnabled ? 1000 : 1500
  };
  triggerBoardFlash("level");
  setTemporaryStatus(`שלב ${level}! כמות האיומים עלתה`, 1200);
  pushToast(`שלב ${level}`, "קצב הריצה עולה", "accent");
}

function applyLevelDifficulty(currentLevel) {
  const config = getDifficultyConfig();
  let obstacleCount = config.obstaclePerLevel;

  if (currentLevel % config.extraObstacleEvery === 0) {
    obstacleCount += 1;
  }

  for (let i = 0; i < obstacleCount; i += 1) {
    spawnObstacle();
  }

  if (currentLevel % config.enemySpawnEvery === 0 && enemies.length < config.maxEnemies) {
    spawnEnemy();
  }

  if (config.extraEnemyChance > 0 && Math.random() < config.extraEnemyChance && enemies.length < config.maxEnemies) {
    spawnEnemy();
  }

  if (isBlockedCell(food)) {
    food = createFood();
  }
}

function maybeSpawnPickup() {
  if (activePickup) return;
  const config = getDifficultyConfig();
  if (score === 0 || score % config.pickupEvery !== 0) return;
  if (Math.random() > config.pickupChance) return;

  const type = choosePickupType();
  const cell = findOpenCell();
  if (!cell) return;

  activePickup = {
    type,
    x: cell.x,
    y: cell.y,
    phase: Math.random() * Math.PI * 2
  };
  setTemporaryStatus(`${formatPickupName(type)} הופיע על הלוח`, 900);
  updateAbilityLabel();
}

function maybeSpawnPortals() {
  const config = getDifficultyConfig();
  if (activePortals.length === 2) return;
  if (level < config.portalLevelEvery || level % config.portalLevelEvery !== 0) return;

  const first = findOpenCell();
  const second = findOpenCell(first);
  if (!first || !second) return;

  activePortals = [
    { id: "A", x: first.x, y: first.y, phase: Math.random() * Math.PI * 2, charges: 3 },
    { id: "B", x: second.x, y: second.y, phase: Math.random() * Math.PI * 2, charges: 3 }
  ];
  setTemporaryStatus("פורטלים נפתחו", 900);
}

function choosePickupType() {
  const weightedPool = ["shield", "shield", "blaster", "slow"];

  if (playerPowerState.blasterCharges <= 1) {
    weightedPool.push("blaster", "blaster", "blaster");
  } else if (playerPowerState.blasterCharges < 4) {
    weightedPool.push("blaster", "blaster");
  }

  if (playerPowerState.shield === 0) weightedPool.push("shield");
  if (level >= 3) weightedPool.push("slow");

  return weightedPool[randomInt(0, weightedPool.length - 1)];
}

function findOpenCell(avoid = null) {
  for (let attempts = 0; attempts < 400; attempts += 1) {
    const candidate = {
      x: randomInt(0, GRID_SIZE - 1),
      y: randomInt(0, GRID_SIZE - 1)
    };

    if (
      !isBlockedCell(candidate) &&
      !isReservedSpawnCell(candidate) &&
      !(avoid && avoid.x === candidate.x && avoid.y === candidate.y)
    ) {
      return candidate;
    }
  }

  return null;
}

function collectPickup(pickup) {
  currentRunStats.pickups += 1;
  switch (pickup.type) {
    case "shield":
      playerPowerState.shield += 1;
      setTemporaryStatus("מגן מוכן", 1100);
      addFloatingText("מגן", pickup.x, pickup.y, "#7de3ff");
      pushToast("מגן נאסף", "פגיעה אחת תיבלם בריצה", "success");
      break;
    case "blaster":
      playerPowerState.blasterCharges += 2;
      activeExplosionBursts.push({
        x: pickup.x,
        y: pickup.y,
        start: performance.now(),
        duration: reducedMotionEnabled ? 220 : 320
      });
      setTemporaryStatus("תחמושת +2", 1100);
      addFloatingText("+2 ירי", pickup.x, pickup.y, "#d9b3ff");
      pushToast("תחמושת נטענה", "קיבלת עוד 2 יריות", "accent");
      break;
    case "slow":
      playerPowerState.slowUntil = performance.now() + 7000;
      setTemporaryStatus("שדה האטה פעיל", 1100);
      addFloatingText("האטה", pickup.x, pickup.y, "#9ff3c8");
      pushToast("שדה האטה", "האויבים יזוזו לאט יותר", "success");
      break;
    default:
      break;
  }

  triggerBoardFlash(pickup.type === "blaster" ? "weapon" : "pickup");
  playSound("gadget");
  updateAmmoHud();
  updateAbilityLabel();
  updateActionButtons();

  if (shouldShowGadgetHelp(pickup.type)) {
    requestAnimationFrame(() => openGadgetHelp(pickup.type));
  }
}

function tryUseShield(message) {
  if (playerPowerState.shield <= 0) return false;
  playerPowerState.shield -= 1;
  triggerBoardFlash("shield");
  addFloatingText("מגן", snake[0].x, snake[0].y, "#7de3ff");
  setTemporaryStatus(message, 900);
  updateAbilityLabel();
  updateActionButtons();
  return true;
}

function updateHazardsLabel() {
  hazardsEl.textContent = String(obstacles.length + enemies.length);
}

function updateSpeedIfNeeded() {
  const nextSpeed = getCurrentSpeedMs();
  if (nextSpeed === currentSpeedMs) return;
  currentSpeedMs = nextSpeed;
  if (running) runLoop();
}

function getCurrentSpeedMs() {
  const config = getDifficultyConfig();
  const scoreBoost = Math.floor(score / 2) * config.speedScoreFactor;
  const levelBoost = (level - 1) * config.speedLevelFactor;
  return Math.max(config.minSpeedMs, config.baseSpeedMs - scoreBoost - levelBoost);
}

function draw(nowMs) {
  maybeCompleteResumeCountdown(nowMs);
  const t = nowMs * 0.001;
  const shake = getBoardShakeOffset(nowMs);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(shake.x, shake.y);
  drawBackground(t);
  drawBoardFlash(nowMs);
  drawGrid(t);
  drawPortals(t);
  drawObstacles(t);
  drawFood(t);
  drawPickup(t);
  drawEnemies(t);
  drawLaserShot(nowMs);
  drawExplosionBursts(nowMs);
  drawSnake(t);
  drawFoodBurst(nowMs);
  drawFloatingTexts(nowMs);
  drawStageBanner(nowMs);

  if (gameOverAt > 0) {
    drawGameOverOverlay(nowMs);
  } else if (resumeCountdown) {
    drawResumeCountdown(nowMs);
  } else if (!started) {
    drawStateOverlay("מוכן לשחק", "לחץ על התחל, החליק על הלוח או השתמש במקשי החצים");
  } else if (!running) {
    drawStateOverlay("המשחק מושהה", "לחץ על המשך או בחר כיוון כדי להמשיך");
  }

  ctx.restore();
}

function drawBackground(t) {
  const theme = getThemeConfig();
  const wobble = reducedMotionEnabled ? 0 : Math.sin(t * 1.35) * 18;
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height + wobble);
  grad.addColorStop(0, theme.boardTop);
  grad.addColorStop(0.55, theme.boardMid);
  grad.addColorStop(1, theme.boardBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const glow = ctx.createRadialGradient(
    canvas.width * 0.5,
    canvas.height * 0.18,
    0,
    canvas.width * 0.5,
    canvas.height * 0.18,
    canvas.width * 0.72
  );
  glow.addColorStop(0, theme.boardGlow);
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawCustomBoardBackground();

  const vignette = ctx.createRadialGradient(
    canvas.width * 0.5,
    canvas.height * 0.5,
    canvas.width * 0.15,
    canvas.width * 0.5,
    canvas.height * 0.5,
    canvas.width * 0.8
  );
  vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
  vignette.addColorStop(1, `rgba(${theme.vignetteRGB}, 0.46)`);
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawCustomBoardBackground() {
  if (!boardBackgroundImage || !boardBackgroundLoaded) return;

  const scale = Math.max(
    canvas.width / boardBackgroundImage.width,
    canvas.height / boardBackgroundImage.height
  );
  const width = boardBackgroundImage.width * scale;
  const height = boardBackgroundImage.height * scale;
  const x = (canvas.width - width) / 2;
  const y = (canvas.height - height) / 2;

  ctx.save();
  ctx.globalAlpha = 0.24;
  ctx.drawImage(boardBackgroundImage, x, y, width, height);
  ctx.restore();

  const shade = ctx.createLinearGradient(0, 0, 0, canvas.height);
  shade.addColorStop(0, "rgba(7, 12, 22, 0.24)");
  shade.addColorStop(1, "rgba(5, 8, 16, 0.38)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBoardFlash(nowMs) {
  if (!boardFlash) return;

  const progress = (nowMs - boardFlash.start) / boardFlash.duration;
  if (progress >= 1) {
    boardFlash = null;
    return;
  }

  const alpha = boardFlash.alpha * (1 - progress);
  ctx.fillStyle = `rgba(${boardFlash.rgb}, ${alpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid(t) {
  const theme = getThemeConfig();
  const alpha = reducedMotionEnabled ? 0.2 : 0.22 + Math.sin(t * 2.2) * 0.06;
  ctx.strokeStyle = `rgba(${theme.gridRGB}, ${alpha})`;
  ctx.lineWidth = 1;

  for (let i = 0; i <= GRID_SIZE; i += 1) {
    const p = i * CELL;

    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, p);
    ctx.lineTo(canvas.width, p);
    ctx.stroke();
  }

  ctx.strokeStyle = `rgba(${theme.gridRGB}, 0.14)`;
  ctx.lineWidth = 1.6;
  ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
}

function drawPortals(t) {
  if (activePortals.length !== 2) return;

  activePortals.forEach((portal, index) => {
    const cx = (portal.x + 0.5) * CELL;
    const cy = (portal.y + 0.5) * CELL;
    const pulse = reducedMotionEnabled ? 1 : 1 + Math.sin(t * 5 + portal.phase) * 0.08;
    const outer = CELL * 0.46 * pulse;
    const inner = CELL * 0.2;
    const color = index === 0 ? "rgba(116, 173, 255, 0.95)" : "rgba(190, 118, 255, 0.95)";

    ctx.strokeStyle = withAlpha(color, 0.42);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, outer, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = withAlpha(color, 0.85);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, outer - 4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = withAlpha(color, 0.18);
    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawFood(t) {
  const theme = getThemeConfig();
  const pulse = reducedMotionEnabled ? 1 : 1 + Math.sin(t * 9) * 0.14;
  const cx = (food.x + 0.5) * CELL;
  const cy = (food.y + 0.5) * CELL;

  ctx.beginPath();
  ctx.fillStyle = theme.foodAura;
  ctx.arc(cx, cy, CELL * 0.46 * pulse, 0, Math.PI * 2);
  ctx.fill();

  const size = CELL - 8;
  const y = food.y * CELL + 4;
  const core = ctx.createRadialGradient(
    cx - 2,
    cy - 3,
    2,
    cx,
    cy,
    CELL * 0.46
  );
  core.addColorStop(0, theme.foodHighlight);
  core.addColorStop(0.38, theme.foodCore);
  core.addColorStop(1, withAlpha(theme.foodCore, 0.78));
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.44, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = theme.foodLeaf;
  ctx.beginPath();
  ctx.ellipse(cx + 3.8, y + 2.5, 4.5, 2.6, -0.45, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(cx, cy - size * 0.24);
  ctx.quadraticCurveTo(cx + 1.5, cy - size * 0.44, cx + 3.4, cy - size * 0.5);
  ctx.stroke();
}

function drawPickup(t) {
  if (!activePickup) return;

  const cx = (activePickup.x + 0.5) * CELL;
  const cy = (activePickup.y + 0.5) * CELL;
  const pulse = reducedMotionEnabled ? 1 : 1 + Math.sin(t * 6 + activePickup.phase) * 0.14;
  const style = PICKUP_STYLES[activePickup.type];
  ctx.fillStyle = style.glow;
  ctx.beginPath();
  ctx.arc(cx, cy, CELL * 0.48 * pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = style.fill;
  drawPickupShape(activePickup.type, cx, cy, CELL * 0.32 * pulse);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.26)";
  ctx.lineWidth = 1.2;
  drawPickupShape(activePickup.type, cx, cy, CELL * 0.32 * pulse);
  ctx.stroke();

  drawPickupGlyph(activePickup.type, cx, cy);
}

function drawPickupShape(type, cx, cy, radius) {
  ctx.beginPath();

  if (type === "shield") {
    ctx.moveTo(cx, cy - radius - 2);
    ctx.lineTo(cx + radius, cy - radius * 0.2);
    ctx.lineTo(cx + radius * 0.7, cy + radius);
    ctx.lineTo(cx, cy + radius + 4);
    ctx.lineTo(cx - radius * 0.7, cy + radius);
    ctx.lineTo(cx - radius, cy - radius * 0.2);
    ctx.closePath();
    return;
  }

  if (type === "slow") {
    ctx.moveTo(cx - radius, cy - radius);
    ctx.lineTo(cx + radius, cy - radius);
    ctx.lineTo(cx + radius * 0.3, cy);
    ctx.lineTo(cx + radius, cy + radius);
    ctx.lineTo(cx - radius, cy + radius);
    ctx.lineTo(cx - radius * 0.3, cy);
    ctx.closePath();
    return;
  }

  for (let i = 0; i < 6; i += 1) {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / 6;
    const px = cx + Math.cos(angle) * radius;
    const py = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function drawPickupGlyph(type, cx, cy) {
  ctx.save();
  ctx.strokeStyle = "rgba(11, 18, 32, 0.86)";
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();

  if (type === "shield") {
    ctx.moveTo(cx, cy - 8);
    ctx.lineTo(cx + 6, cy - 4);
    ctx.lineTo(cx + 4, cy + 5);
    ctx.lineTo(cx, cy + 9);
    ctx.lineTo(cx - 4, cy + 5);
    ctx.lineTo(cx - 6, cy - 4);
    ctx.closePath();
  } else if (type === "slow") {
    ctx.moveTo(cx - 4, cy - 7);
    ctx.lineTo(cx + 4, cy - 7);
    ctx.lineTo(cx + 1.5, cy - 1);
    ctx.lineTo(cx + 1.5, cy + 1);
    ctx.lineTo(cx + 4, cy + 7);
    ctx.lineTo(cx - 4, cy + 7);
    ctx.lineTo(cx - 1.5, cy + 1);
    ctx.lineTo(cx - 1.5, cy - 1);
    ctx.closePath();
  } else {
    ctx.moveTo(cx - 7, cy);
    ctx.lineTo(cx + 7, cy);
    ctx.moveTo(cx, cy - 7);
    ctx.lineTo(cx, cy + 7);
    ctx.moveTo(cx - 4.5, cy - 4.5);
    ctx.lineTo(cx + 4.5, cy + 4.5);
    ctx.moveTo(cx + 4.5, cy - 4.5);
    ctx.lineTo(cx - 4.5, cy + 4.5);
  }

  ctx.stroke();
  ctx.restore();
}

function drawSnake(t) {
  const skin = getSkinConfig();

  for (let i = 0; i < snake.length; i += 1) {
    const part = snake[i];
    const isHead = i === 0;
    const wave = Math.sin(t * 12 - i * 0.5) * 0.65;
    const x = part.x * CELL + 1.9 + wave * 0.28;
    const y = part.y * CELL + 1.9 + wave * 0.28;
    const size = CELL - 3.8;

    ctx.fillStyle = "rgba(3, 7, 15, 0.24)";
    roundRect(x + 0.8, y + 1.8, size, size, 7);
    ctx.fill();

    ctx.fillStyle = isHead ? skin.headGlow : skin.bodyGlow;
    roundRect(x - 0.4, y - 0.4, size + 0.8, size + 0.8, 7);
    ctx.fill();

    const fill = ctx.createLinearGradient(x, y, x + size, y + size);
    fill.addColorStop(0, withAlpha(skin.highlight, isHead ? 0.95 : 0.72));
    fill.addColorStop(0.32, isHead ? skin.head : skin.body);
    fill.addColorStop(1, withAlpha(isHead ? skin.head : skin.body, 0.76));
    ctx.fillStyle = fill;
    roundRect(x, y, size, size, 6);
    ctx.fill();

    const belly = ctx.createLinearGradient(x, y + size * 0.2, x, y + size);
    belly.addColorStop(0, "rgba(255, 255, 255, 0)");
    belly.addColorStop(1, "rgba(225, 250, 238, 0.14)");
    ctx.fillStyle = belly;
    roundRect(x + 1.4, y + size * 0.45, size - 2.8, size * 0.34, 4);
    ctx.fill();

    ctx.strokeStyle = isHead ? "rgba(232, 255, 246, 0.18)" : "rgba(209, 247, 231, 0.1)";
    ctx.lineWidth = 1;
    roundRect(x, y, size, size, 6);
    ctx.stroke();

    if (!isHead) {
      ctx.strokeStyle = "rgba(222, 248, 236, 0.08)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(x + 3, y + size * 0.28);
      ctx.lineTo(x + size - 3, y + size * 0.28);
      ctx.moveTo(x + 3, y + size * 0.52);
      ctx.lineTo(x + size - 3, y + size * 0.52);
      ctx.stroke();
    }
  }

  drawSnakeEyes();
}

function drawSnakeEyes() {
  const skin = getSkinConfig();
  const head = snake[0];
  const centerX = (head.x + 0.5) * CELL;
  const centerY = (head.y + 0.5) * CELL;
  const perpendicular = { x: -direction.y, y: direction.x };

  const eyeForward = 3;
  const eyeSpread = 2.4;
  const eyeRadius = 1.3;

  ctx.fillStyle = skin.eye;
  ctx.beginPath();
  ctx.arc(
    centerX + direction.x * eyeForward + perpendicular.x * eyeSpread,
    centerY + direction.y * eyeForward + perpendicular.y * eyeSpread,
    eyeRadius,
    0,
    Math.PI * 2
  );
  ctx.arc(
    centerX + direction.x * eyeForward - perpendicular.x * eyeSpread,
    centerY + direction.y * eyeForward - perpendicular.y * eyeSpread,
    eyeRadius,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
  ctx.beginPath();
  ctx.arc(
    centerX + direction.x * eyeForward + perpendicular.x * eyeSpread - 0.35,
    centerY + direction.y * eyeForward + perpendicular.y * eyeSpread - 0.45,
    0.45,
    0,
    Math.PI * 2
  );
  ctx.arc(
    centerX + direction.x * eyeForward - perpendicular.x * eyeSpread - 0.35,
    centerY + direction.y * eyeForward - perpendicular.y * eyeSpread - 0.45,
    0.45,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

function drawObstacles(t) {
  const theme = getThemeConfig();

  for (let i = 0; i < obstacles.length; i += 1) {
    const obstacle = obstacles[i];
      const glow = reducedMotionEnabled ? 0.28 : 0.24 + (Math.sin(t * 3.7 + obstacle.phase) + 1) * 0.13;
    const x = obstacle.x * CELL + 2;
    const y = obstacle.y * CELL + 2;
    const size = CELL - 4;

    const fill = ctx.createLinearGradient(x, y, x + size, y + size);
    fill.addColorStop(0, `rgba(${theme.obstacleFillRGB}, ${glow + 0.12})`);
    fill.addColorStop(1, `rgba(${theme.obstacleFillRGB}, ${Math.max(0.18, glow - 0.08)})`);
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, size, size);
    ctx.strokeStyle = theme.obstacleStroke;
    ctx.lineWidth = 1.25;
    ctx.strokeRect(x + 0.7, y + 0.7, size - 1.4, size - 1.4);

    ctx.fillStyle = theme.obstacleAccent;
    ctx.fillRect(x + 2.5, y + 2.5, size - 5, 3.2);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.beginPath();
    ctx.moveTo(x + 2, y + 2);
    ctx.lineTo(x + size - 2, y + size - 2);
    ctx.moveTo(x + size - 2, y + 2);
    ctx.lineTo(x + 2, y + size - 2);
    ctx.stroke();
  }
}

function drawEnemies(t) {
  const theme = getThemeConfig();

  for (let i = 0; i < enemies.length; i += 1) {
    const enemy = enemies[i];
    const cx = (enemy.x + 0.5) * CELL;
    const cy = (enemy.y + 0.5) * CELL;
    const pulse = reducedMotionEnabled ? 1 : 1 + Math.sin(t * 7 + enemy.phase) * 0.1;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 2.3 + enemy.phase);
    ctx.fillStyle = theme.enemyAura;
    ctx.beginPath();
    ctx.moveTo(0, -CELL * 0.44 * pulse);
    ctx.lineTo(CELL * 0.16 * pulse, -CELL * 0.16);
    ctx.lineTo(CELL * 0.44 * pulse, 0);
    ctx.lineTo(CELL * 0.16, CELL * 0.16 * pulse);
    ctx.lineTo(0, CELL * 0.44 * pulse);
    ctx.lineTo(-CELL * 0.16, CELL * 0.16 * pulse);
    ctx.lineTo(-CELL * 0.44 * pulse, 0);
    ctx.lineTo(-CELL * 0.16 * pulse, -CELL * 0.16);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = theme.enemyCore;
    ctx.beginPath();
    ctx.arc(0, 0, CELL * 0.22, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = theme.enemySpike;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-CELL * 0.12, -2);
    ctx.lineTo(CELL * 0.12, -2);
    ctx.moveTo(0, -CELL * 0.12);
    ctx.lineTo(0, CELL * 0.12);
    ctx.stroke();

    ctx.fillStyle = "rgba(18, 7, 7, 0.82)";
    ctx.beginPath();
    ctx.arc(0, 0, CELL * 0.08, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 236, 216, 0.8)";
    ctx.beginPath();
    ctx.arc(-1.2, -1.2, CELL * 0.025, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawLaserShot(nowMs) {
  if (!laserShot) return;
  const progress = (nowMs - laserShot.start) / (reducedMotionEnabled ? 120 : 180);
  if (progress >= 1) {
    laserShot = null;
    return;
  }

  const fromX = (laserShot.from.x + 0.5) * CELL;
  const fromY = (laserShot.from.y + 0.5) * CELL;
  const toX = (laserShot.to.x + 0.5) * CELL;
  const toY = (laserShot.to.y + 0.5) * CELL;

  ctx.save();
  ctx.strokeStyle = `rgba(236, 210, 255, ${0.95 - progress * 0.82})`;
  ctx.lineWidth = 6 - progress * 3;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  ctx.strokeStyle = `rgba(135, 218, 255, ${0.72 - progress * 0.6})`;
  ctx.lineWidth = 2.4 - progress * 1.4;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  ctx.fillStyle = `rgba(255, 240, 194, ${0.65 - progress * 0.5})`;
  ctx.beginPath();
  ctx.arc(toX, toY, CELL * (0.16 + progress * 0.14), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawExplosionBursts(nowMs) {
  if (activeExplosionBursts.length === 0) return;

  activeExplosionBursts = activeExplosionBursts.filter((burst) => nowMs - burst.start < burst.duration);

  activeExplosionBursts.forEach((burst) => {
    const progress = (nowMs - burst.start) / burst.duration;
    const cx = (burst.x + 0.5) * CELL;
    const cy = (burst.y + 0.5) * CELL;
    const outer = CELL * (0.28 + progress * 0.95);
    const inner = CELL * (0.12 + progress * 0.45);

    ctx.save();
    ctx.strokeStyle = `rgba(255, 186, 110, ${0.82 - progress * 0.66})`;
    ctx.lineWidth = 3 - progress * 1.8;
    ctx.beginPath();
    ctx.arc(cx, cy, outer, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = `rgba(255, 122, 96, ${0.36 - progress * 0.3})`;
    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(255, 223, 153, ${0.9 - progress * 0.78})`;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 6; i += 1) {
      const angle = (Math.PI * 2 * i) / 6 + progress * 0.8;
      const from = CELL * 0.12;
      const to = CELL * (0.45 + progress * 0.48);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * from, cy + Math.sin(angle) * from);
      ctx.lineTo(cx + Math.cos(angle) * to, cy + Math.sin(angle) * to);
      ctx.stroke();
    }
    ctx.restore();
  });
}

function drawFoodBurst(nowMs) {
  if (!foodBurst) return;

  const theme = getThemeConfig();
  const progress = (nowMs - foodBurst.start) / 380;

  if (progress >= 1) {
    foodBurst = null;
    return;
  }

  const cx = (foodBurst.x + 0.5) * CELL;
  const cy = (foodBurst.y + 0.5) * CELL;

  ctx.strokeStyle = `rgba(${theme.burstRGB}, ${0.5 - progress * 0.45})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, CELL * (0.35 + progress * 0.7), 0, Math.PI * 2);
  ctx.stroke();
}

function drawGameOverOverlay(nowMs) {
  const theme = getThemeConfig();
  const alpha = Math.min(0.68, ((nowMs - gameOverAt) / 280) * 0.68);
  ctx.fillStyle = `rgba(${theme.overlayRGB}, ${alpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawStateOverlay("המשחק נגמר", `${gameOverMessage} | ניקוד ${score}`);
}

function drawStateOverlay(title, subtitle) {
  const cardWidth = canvas.width * 0.76;
  const cardHeight = 112;
  const x = (canvas.width - cardWidth) / 2;
  const y = (canvas.height - cardHeight) / 2;

  ctx.fillStyle = "rgba(9, 15, 28, 0.82)";
  roundRect(x, y, cardWidth, cardHeight, 16);
  ctx.fill();

  ctx.strokeStyle = "rgba(136, 166, 236, 0.26)";
  ctx.lineWidth = 1.4;
  roundRect(x, y, cardWidth, cardHeight, 16);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = "bold 28px Segoe UI";
  ctx.fillText(title, canvas.width / 2, y + 42);

  ctx.fillStyle = "#c8d7f7";
  ctx.font = "16px Segoe UI";
  ctx.fillText(subtitle, canvas.width / 2, y + 75);
}

function drawFloatingTexts(nowMs) {
  if (floatingTexts.length === 0) return;

  floatingTexts = floatingTexts.filter((entry) => nowMs - entry.start < entry.duration);

  floatingTexts.forEach((entry) => {
    const progress = (nowMs - entry.start) / entry.duration;
    const x = (entry.x + 0.5) * CELL;
    const y = (entry.y + 0.5) * CELL - progress * 18;
    ctx.fillStyle = withAlpha(entry.color, 1 - progress);
    ctx.font = "bold 16px Segoe UI";
    ctx.textAlign = "center";
    ctx.fillText(entry.text, x, y);
  });
}

function drawStageBanner(nowMs) {
  if (!stageBanner) return;

  const progress = (nowMs - stageBanner.start) / stageBanner.duration;
  if (progress >= 1) {
    stageBanner = null;
    return;
  }

  const alpha = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;
  const slide = Math.max(0, 1 - progress * 2.4) * 16;

  ctx.save();
  ctx.translate(0, slide);
  ctx.fillStyle = withAlpha(stageBanner.color, alpha * 0.22);
  roundRect(76, 26, canvas.width - 152, 54, 14);
  ctx.fill();

  ctx.strokeStyle = withAlpha(stageBanner.color, alpha * 0.48);
  ctx.lineWidth = 1.2;
  roundRect(76, 26, canvas.width - 152, 54, 14);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = withAlpha("#ffffff", alpha);
  ctx.font = "bold 22px Segoe UI";
  ctx.fillText(stageBanner.title, canvas.width / 2, 49);

  ctx.fillStyle = withAlpha("#d7e4ff", alpha * 0.96);
  ctx.font = "14px Segoe UI";
  ctx.fillText(stageBanner.subtitle, canvas.width / 2, 67);
  ctx.restore();
}

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function setDirection(dir) {
  const map = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  const candidate = map[dir];
  if (!candidate) return;
  if (resumeCountdown) return;

  if (candidate.x === -nextDirection.x && candidate.y === -nextDirection.y) return;

  if (!started) {
    startFreshRun(candidate);
    return;
  }

  nextDirection = candidate;

  if (!running && started && gameOverAt === 0) {
    startGame();
  }
}

function matchesKeyInput(event, { key, code, keys = [], codes = [] }) {
  if (key && event.key === key) return true;
  if (code && event.code === code) return true;
  if (keys.includes(event.key)) return true;
  if (codes.includes(event.code)) return true;
  return false;
}

function onKeyDown(event) {
  if (event.ctrlKey || event.altKey || event.metaKey) return;
  if (event.target instanceof HTMLElement) {
    const tagName = event.target.tagName;
    if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") {
      if (event.key !== "Escape" && event.key !== "Enter") return;
    }
  }

  if (runResultsPanel && !runResultsPanel.hidden) {
    if (event.key === "Escape") {
      setRunResultsOpen(false);
      initGame();
      setMenuOpen(true);
    } else if (event.key === "Enter") {
      if (pendingScoreEntry) {
        setRunResultsOpen(false);
        setRecordScoreOpen(true);
      } else {
        startFreshRun();
      }
    }
    return;
  }

  if (recordScorePanel && !recordScorePanel.hidden) {
    if (event.key === "Escape") {
      skipPendingScoreRecord();
    } else if (event.key === "Enter") {
      void submitPendingScoreRecord();
    }
    return;
  }

  if (authPanel && !authPanel.hidden) {
    if (event.key === "Escape") {
      setAuthOpen(false);
    }
    return;
  }

  if (menuPanel && !menuPanel.hidden) {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
    return;
  }

  if (leaderboardPanel && !leaderboardPanel.hidden) {
    if (event.key === "Escape") {
      setLeaderboardOpen(false);
    }
    return;
  }

  if (gadgetHelpOpen && event.key !== "Escape" && event.key !== "Enter" && event.key !== " ") {
    return;
  }

  if (matchesKeyInput(event, { keys: ["ArrowUp", "w", "W"], codes: ["KeyW"] })) {
    event.preventDefault();
    setDirection("up");
    return;
  }

  if (matchesKeyInput(event, { keys: ["ArrowDown", "s", "S"], codes: ["KeyS"] })) {
    event.preventDefault();
    setDirection("down");
    return;
  }

  if (matchesKeyInput(event, { keys: ["ArrowLeft", "a", "A"], codes: ["KeyA"] })) {
    event.preventDefault();
    setDirection("left");
    return;
  }

  if (matchesKeyInput(event, { keys: ["ArrowRight", "d", "D"], codes: ["KeyD"] })) {
    event.preventDefault();
    setDirection("right");
    return;
  }

  if (matchesKeyInput(event, { key: " ", code: "Space" })) {
    event.preventDefault();
    if (gadgetHelpOpen) {
      closeGadgetHelp();
      return;
    }
    togglePause();
    return;
  }

  if (matchesKeyInput(event, { key: "Enter", code: "Enter" })) {
    if (gadgetHelpOpen) {
      closeGadgetHelp();
      return;
    }
    handlePrimaryButtonClick();
    return;
  }

  if (matchesKeyInput(event, { keys: ["f", "F"], codes: ["KeyF"] })) {
    event.preventDefault();
    fireWeapon();
    return;
  }

  if (matchesKeyInput(event, { key: "Escape", code: "Escape" })) {
    if (gadgetHelpOpen) {
      closeGadgetHelp();
      return;
    }
    if (menuPanel && !menuPanel.hidden) {
      setMenuOpen(false);
    }
    if (leaderboardPanel && !leaderboardPanel.hidden) {
      setLeaderboardOpen(false);
    }
    if (recordScorePanel && !recordScorePanel.hidden) {
      skipPendingScoreRecord();
    }
    if (runResultsPanel && !runResultsPanel.hidden) {
      setRunResultsOpen(false);
      initGame();
      setMenuOpen(true);
    }
    return;
  }
}

function onCanvasPointerDown(event) {
  focusGameSurface();
  if (event.pointerType === "mouse") return;

  swipeStart = {
    x: event.clientX,
    y: event.clientY
  };

  if (canvas.setPointerCapture) {
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch {
      // Ignore unsupported pointer capture scenarios.
    }
  }

  event.preventDefault();
}

function onCanvasPointerUp(event) {
  if (!swipeStart) return;

  const dx = event.clientX - swipeStart.x;
  const dy = event.clientY - swipeStart.y;
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);
  swipeStart = null;

  if (Math.max(absX, absY) < SWIPE_MIN_DISTANCE) {
    if (!running) {
      startGame();
    }
    event.preventDefault();
    return;
  }

  if (absX > absY) {
    setDirection(dx > 0 ? "right" : "left");
  } else {
    setDirection(dy > 0 ? "down" : "up");
  }

  event.preventDefault();
}

function onCanvasPointerCancel() {
  swipeStart = null;
}

function onGlobalTouchEnd(event) {
  const target = event.target;
  const shouldGuard =
    target instanceof Element &&
    target.closest(".board-shell, .touch-controls, .controls, .difficulty");

  if (!shouldGuard) return;

  const now = Date.now();
  if (now - lastTouchEndAt < DOUBLE_TAP_GUARD_MS) {
    event.preventDefault();
  }
  lastTouchEndAt = now;
}

function onGlobalGestureStart(event) {
  event.preventDefault();
}

function setPlayingStatus() {
  const config = getDifficultyConfig();
  statusEl.textContent = `משחק פעיל - ${config.label} - שלב ${level}`;
}

function setTemporaryStatus(message, durationMs) {
  clearStatusTimer();
  statusEl.textContent = message;

  statusTimeout = setTimeout(() => {
    statusTimeout = null;
    if (running) {
      setPlayingStatus();
      return;
    }

    if (!started) {
      statusEl.textContent = getIdleStatus();
    }
  }, durationMs);
}

function flashElement(element, className, durationMs) {
  if (!element) return;
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
  window.setTimeout(() => {
    element.classList.remove(className);
  }, durationMs);
}

function pulseProgressionUI() {
  const progressCard = playerLevelBadgeEl?.closest(".menu-panel-block");
  const pulseDuration = reducedMotionEnabled ? 220 : 900;
  flashElement(progressCard, "is-highlighted", pulseDuration);
  flashElement(playerLevelBadgeEl, "is-highlighted", pulseDuration);
}

function pushToast(title, detail = "", tone = "accent") {
  if (!toastStackEl || !title) return;

  const toast = document.createElement("article");
  toast.className = `game-toast game-toast--${tone}`;
  toast.setAttribute("role", "status");
  toast.innerHTML = `
    <p class="game-toast__title">${escapeHtml(title)}</p>
    ${detail ? `<p class="game-toast__detail">${escapeHtml(detail)}</p>` : ""}
  `;

  toastStackEl.appendChild(toast);
  while (toastStackEl.children.length > 3) {
    toastStackEl.removeChild(toastStackEl.firstElementChild);
  }

  requestAnimationFrame(() => {
    toast.classList.add("is-visible");
  });

  const visibleMs = reducedMotionEnabled ? 1800 : 2800;
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => {
      toast.remove();
    }, reducedMotionEnabled ? 0 : 180);
  }, visibleMs);
}

function clearStatusTimer() {
  if (!statusTimeout) return;
  clearTimeout(statusTimeout);
  statusTimeout = null;
}

function setDifficulty(nextDifficulty) {
  const normalized = normalizeKey(nextDifficulty, DIFFICULTY_PRESETS, difficulty);
  if (normalized === difficulty) return;

  difficulty = normalized;
  localStorage.setItem(STORAGE_KEYS.difficulty, difficulty);
  updateDifficultyButtons();

  initGame();
  setTemporaryStatus(`רמת הקושי הוגדרה ל־${DIFFICULTY_PRESETS[difficulty].label}`, 1500);
}

function updateDifficultyButtons() {
  difficultyButtons.forEach((button) => {
    const isActive = button.dataset.difficulty === difficulty;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
  updateModeLabel();
}

function setTheme(nextTheme) {
  const normalized = normalizeKey(nextTheme, BACKGROUND_THEMES, activeTheme);
  activeTheme = isThemeUnlocked(normalized) ? normalized : getFirstUnlockedTheme();
  localStorage.setItem(STORAGE_KEYS.theme, activeTheme);
  applyThemeTokensToDocument();
  updateCustomizationUI();
}

function setSnakeSkin(nextSkin) {
  const normalized = normalizeKey(nextSkin, SNAKE_SKINS, activeSkin);
  activeSkin = isSkinUnlocked(normalized) ? normalized : getFirstUnlockedSkin();
  localStorage.setItem(STORAGE_KEYS.snakeSkin, activeSkin);
  applyThemeTokensToDocument();
  updateCustomizationUI();
}

function setPlayerName(nextName) {
  playerName = sanitizePlayerName(nextName);
  localStorage.setItem(STORAGE_KEYS.playerName, playerName);
  renderLeaderboards();
  updateCustomizationUI();
}

function setAudioMuted(isMuted) {
  audioMuted = Boolean(isMuted);
  localStorage.setItem(STORAGE_KEYS.audioMuted, audioMuted ? "1" : "0");
  if (audioContext && audioMuted) {
    audioContext.suspend().catch(() => {});
  } else if (audioContext && !audioMuted) {
    audioContext.resume().catch(() => {});
  }
  updateCustomizationUI();
}

function setGadgetTipsDisabled(isDisabled) {
  gadgetTipsDisabled = Boolean(isDisabled);
  localStorage.setItem(STORAGE_KEYS.gadgetTipsDisabled, gadgetTipsDisabled ? "1" : "0");
  updateCustomizationUI();
}

function setReducedMotionEnabled(isEnabled) {
  reducedMotionEnabled = Boolean(isEnabled);
  localStorage.setItem(STORAGE_KEYS.reducedMotion, reducedMotionEnabled ? "1" : "0");
  updateCustomizationUI();
}

function setControlLayout(nextLayout) {
  preferredControlLayout = normalizeKey(nextLayout, CONTROL_LAYOUT_PRESETS, preferredControlLayout);
  localStorage.setItem(STORAGE_KEYS.controlLayout, preferredControlLayout);
  applyControlLayout();
  updateTouchControlSettingsUI();
  requestAnimationFrame(syncViewportLayout);
}

function setControlSize(nextSize) {
  preferredControlSize = normalizeKey(nextSize, CONTROL_SIZE_PRESETS, preferredControlSize);
  localStorage.setItem(STORAGE_KEYS.controlSize, preferredControlSize);
  applyControlLayout();
  updateTouchControlSettingsUI();
  requestAnimationFrame(syncViewportLayout);
}

function setControlSide(nextSide) {
  preferredControlSide = normalizeKey(nextSide, CONTROL_SIDE_PRESETS, preferredControlSide);
  localStorage.setItem(STORAGE_KEYS.controlSide, preferredControlSide);
  applyControlLayout();
  updateTouchControlSettingsUI();
  requestAnimationFrame(syncViewportLayout);
}

function applyControlLayout() {
  const layout = CONTROL_LAYOUT_PRESETS[preferredControlLayout].layout;
  const size = CONTROL_SIZE_PRESETS[preferredControlSize].size;
  const side = CONTROL_SIDE_PRESETS[preferredControlSide].side;

  if (touchControlsEl) {
    touchControlsEl.dataset.layout = layout;
    touchControlsEl.dataset.size = size;
    touchControlsEl.dataset.side = side;
  }

  if (menuTouchPreview) {
    menuTouchPreview.dataset.layout = layout;
    menuTouchPreview.dataset.size = size;
    menuTouchPreview.dataset.side = side;
  }
}

function updateTouchControlSettingsUI() {
  if (controlLayoutSelect) controlLayoutSelect.value = preferredControlLayout;
  if (controlSizeSelect) controlSizeSelect.value = preferredControlSize;
  if (controlSideSelect) controlSideSelect.value = preferredControlSide;
  if (menuControlLayoutSelect) menuControlLayoutSelect.value = preferredControlLayout;
  if (menuControlSizeSelect) menuControlSizeSelect.value = preferredControlSize;
  if (menuControlSideSelect) menuControlSideSelect.value = preferredControlSide;
}

function updateTouchControlsVisibility() {
  if (!touchControlsEl) return;
  if (!isTouchDevice) {
    touchControlsEl.hidden = false;
    return;
  }

  const shouldShow = started && gameOverAt === 0 && !homeOpen && !authOpen;
  touchControlsEl.hidden = !shouldShow;
}

function updatePlayLayoutState() {
  if (!appWrapEl) return;
  const overlayOpen =
    !menuPanel?.hidden ||
    !leaderboardPanel?.hidden ||
    !recordScorePanel?.hidden ||
    !runResultsPanel?.hidden ||
    !authPanel?.hidden ||
    gadgetHelpOpen ||
    homeOpen;
  const isPlayFocused = !homeOpen && (started || gameOverAt > 0 || authOpen);
  const isBoardOnly = running && !overlayOpen;
  appWrapEl.classList.toggle("is-play-focused", isPlayFocused);
  appWrapEl.classList.toggle("is-board-only", isBoardOnly);
  updateTouchControlsVisibility();
  requestAnimationFrame(syncViewportLayout);
}

function loadSeenGadgetTips() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.gadgetTipsSeen);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function saveSeenGadgetTips() {
  localStorage.setItem(STORAGE_KEYS.gadgetTipsSeen, JSON.stringify([...seenGadgetTips]));
}

function updateCustomizationUI() {
  populateCustomizationSelects();
  if (playerNameInput) playerNameInput.value = playerName;
  if (profileNameInput) profileNameInput.value = playerName;
  if (recordPlayerNameInput) recordPlayerNameInput.value = playerName;
  if (themeSelect) themeSelect.value = activeTheme;
  if (snakeSkinSelect) snakeSkinSelect.value = activeSkin;
  if (soundToggle) soundToggle.checked = !audioMuted;
  if (gadgetTipsToggle) gadgetTipsToggle.checked = !gadgetTipsDisabled;
  if (reducedMotionToggle) reducedMotionToggle.checked = reducedMotionEnabled;

  if (backgroundUrlInput && boardBackgroundSource.startsWith("http")) {
    backgroundUrlInput.value = boardBackgroundSource;
  } else if (backgroundUrlInput && (!boardBackgroundSource || boardBackgroundSource.startsWith("data:"))) {
    backgroundUrlInput.value = "";
  }

  if (backgroundPreviewEl) {
    backgroundPreviewEl.classList.toggle("has-image", boardBackgroundLoaded);
    backgroundPreviewEl.style.backgroundImage = boardBackgroundLoaded
      ? `url("${boardBackgroundResolvedSource}")`
      : "";
  }

  if (backgroundStatusEl) {
    if (boardBackgroundLoaded) {
      backgroundStatusEl.textContent = boardBackgroundSessionOnly
        ? "תמונה פעילה לסשן הזה"
        : !boardBackgroundSource
        ? "רקע ברירת המחדל פעיל"
        : boardBackgroundSource.startsWith("data:")
        ? "תמונה מהמכשיר פעילה"
        : "תמונה מקישור פעילה";
    } else if (boardBackgroundError) {
      backgroundStatusEl.textContent = boardBackgroundError;
    } else {
      backgroundStatusEl.textContent = "רקע ברירת מחדל";
    }
  }
  updateAuthUI();
}

function loadBoardBackground(source) {
  const resolvedSource = source || DEFAULT_BOARD_BACKGROUND;
  boardBackgroundError = "טוען תמונה...";
  boardBackgroundLoaded = false;
  boardBackgroundResolvedSource = resolvedSource;
  updateCustomizationUI();

  const image = new Image();
  image.onload = () => {
    boardBackgroundImage = image;
    boardBackgroundLoaded = true;
    boardBackgroundError = "";
    updateCustomizationUI();
  };
  image.onerror = () => {
    boardBackgroundLoaded = false;
    boardBackgroundImage = null;
    boardBackgroundError = resolvedSource === DEFAULT_BOARD_BACKGROUND
      ? "טעינת רקע ברירת המחדל נכשלה"
      : "טעינת התמונה נכשלה";
    updateCustomizationUI();
  };
  image.src = resolvedSource;
}

function setCustomBoardBackground(source) {
  boardBackgroundSource = source;
  boardBackgroundSessionOnly = false;
  if (!source) {
    localStorage.removeItem(STORAGE_KEYS.boardBackground);
  } else {
    try {
      localStorage.setItem(STORAGE_KEYS.boardBackground, source);
    } catch {
      boardBackgroundSessionOnly = true;
    }
  }
  loadBoardBackground(boardBackgroundSource);
}

function shouldShowGadgetHelp(type) {
  return !gadgetTipsDisabled && !seenGadgetTips.has(type);
}

function openGadgetHelp(type) {
  const help = GADGET_HELP[type];
  if (!gadgetHelpPanel || !help || gadgetHelpOpen) return;

  gadgetHelpOpen = true;
  activeGadgetHelpType = type;
  gadgetHelpResumeAfterClose = running;

  if (menuPanel) menuPanel.hidden = true;
  if (leaderboardPanel) leaderboardPanel.hidden = true;

  if (running) {
    running = false;
    stopLoop();
  }

  if (gadgetHelpTitleEl) gadgetHelpTitleEl.textContent = help.title;
  if (gadgetHelpDescriptionEl) gadgetHelpDescriptionEl.textContent = help.description;
  if (gadgetHelpIconEl) gadgetHelpIconEl.textContent = help.icon;
  if (gadgetHelpSkipToggle) gadgetHelpSkipToggle.checked = gadgetTipsDisabled;

  gadgetHelpPanel.hidden = false;
  updatePlayLayoutState();
  statusEl.textContent = `הסבר על ${help.title}`;
  updateActionButtons();
}

function closeGadgetHelp() {
  if (!gadgetHelpOpen) return;

  seenGadgetTips.add(activeGadgetHelpType);
  saveSeenGadgetTips();
  setGadgetTipsDisabled(Boolean(gadgetHelpSkipToggle?.checked));
  gadgetHelpOpen = false;
  activeGadgetHelpType = "";
  if (gadgetHelpPanel) gadgetHelpPanel.hidden = true;

  if (gadgetHelpResumeAfterClose && started && gameOverAt === 0) {
    beginResumeCountdown();
  } else if (!started) {
    statusEl.textContent = getIdleStatus();
  }

  gadgetHelpResumeAfterClose = false;
  updatePlayLayoutState();
  updateActionButtons();
  if (started && gameOverAt === 0) focusGameSurface();
}

function primeAudio() {
  if (audioMuted) return;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return;

  if (!audioContext) {
    audioContext = new AudioCtor();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
}

function playSound(kind) {
  if (audioMuted) return;
  primeAudio();
  if (!audioContext) return;

  switch (kind) {
    case "eat":
      playTone(620, 0.06, 0.05, "triangle", 960);
      playTone(880, 0.05, 0.03, "sine", 1180, 0.05);
      break;
    case "gadget":
      playTone(360, 0.08, 0.045, "triangle", 520);
      playTone(540, 0.08, 0.04, "triangle", 740, 0.07);
      playTone(820, 0.09, 0.03, "sine", 960, 0.11);
      break;
    case "weapon":
      playTone(920, 0.06, 0.045, "square", 660);
      break;
    case "portal":
      playTone(420, 0.09, 0.03, "sine", 760);
      playTone(760, 0.12, 0.025, "triangle", 420, 0.03);
      break;
    case "fail":
      playTone(240, 0.22, 0.07, "sawtooth", 110);
      playTone(160, 0.28, 0.045, "triangle", 80, 0.03);
      break;
    default:
      break;
  }
}

function playTone(startFreq, duration, volume, type, endFreq = startFreq, delay = 0) {
  if (!audioContext) return;

  const now = audioContext.currentTime + delay;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(startFreq, now);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(40, endFreq), now + duration);

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(volume, now + 0.015);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
}

function updateModeLabel() {
  if (!modeLabelEl) return;
  modeLabelEl.textContent = getDifficultyConfig().label;
}

function updateAbilityLabel() {
  if (!abilityLabelEl) return;

  if (playerPowerState.blasterCharges > 0) {
    abilityLabelEl.textContent = `בלסטר x${playerPowerState.blasterCharges}`;
    updateMiniHud();
    return;
  }

  if (playerPowerState.shield > 0) {
    abilityLabelEl.textContent = `מגן x${playerPowerState.shield}`;
    updateMiniHud();
    return;
  }

  if (performance.now() < playerPowerState.slowUntil) {
    abilityLabelEl.textContent = "שדה האטה";
    updateMiniHud();
    return;
  }

  abilityLabelEl.textContent = activePickup ? `איסוף: ${formatPickupName(activePickup.type)}` : "אין בוסט";
  updateMiniHud();
}

function updateActionButtons() {
  const controlsBlocked = hasBlockingOverlayOpen();
  const ammoCount = Math.max(0, playerPowerState.blasterCharges);
  const canFire =
    ammoCount > 0 &&
    running &&
    started &&
    gameOverAt === 0 &&
    !gadgetHelpOpen &&
    !resumeCountdown &&
    !controlsBlocked;
  const isIdle = !started && gameOverAt === 0;
  const isPaused = started && !running && gameOverAt === 0 && !resumeCountdown;
  const isCountingDown = Boolean(resumeCountdown);
  const isGameOver = gameOverAt > 0;
  const hasRecordableScore = Boolean(pendingScoreEntry);
  const showFireAction = started && gameOverAt === 0;

  startBtn.hidden = false;
  pauseBtn.hidden = false;
  restartBtn.hidden = false;

  if (isIdle) {
    startBtn.textContent = homeOpen ? "התחל משחק" : "התחל";
    startBtn.disabled = gadgetHelpOpen;
    pauseBtn.hidden = true;
    restartBtn.hidden = true;
  } else if (running) {
    startBtn.hidden = true;
    pauseBtn.textContent = "עצור";
    pauseBtn.disabled = gadgetHelpOpen || controlsBlocked;
    restartBtn.textContent = "ריצה חדשה";
    restartBtn.disabled = gadgetHelpOpen || controlsBlocked;
  } else if (isCountingDown) {
    startBtn.textContent = `חוזרים ${getResumeCountdownValue(performance.now()) ?? 3}`;
    startBtn.disabled = true;
    pauseBtn.hidden = true;
    restartBtn.textContent = "ריצה חדשה";
    restartBtn.disabled = gadgetHelpOpen || controlsBlocked;
  } else if (isPaused) {
    startBtn.textContent = "המשך";
    startBtn.disabled = gadgetHelpOpen || controlsBlocked;
    pauseBtn.hidden = true;
    restartBtn.textContent = "ריצה חדשה";
    restartBtn.disabled = gadgetHelpOpen || controlsBlocked;
  } else if (isGameOver) {
    startBtn.textContent = hasRecordableScore ? "תעד שיא" : "לתפריט";
    startBtn.disabled = gadgetHelpOpen || controlsBlocked;
    pauseBtn.hidden = true;
    restartBtn.textContent = "ריצה חדשה";
    restartBtn.disabled = gadgetHelpOpen || controlsBlocked;
  }

  fireBtn.disabled = !canFire;
  touchFireBtn.disabled = !canFire;
  if (miniFireBtn) miniFireBtn.disabled = !canFire;
  fireBtn.hidden = !showFireAction;
  touchFireBtn.hidden = !showFireAction;
  if (miniFireBtn) miniFireBtn.hidden = !showFireAction;
  fireBtn.dataset.canFire = canFire ? "true" : "false";
  touchFireBtn.dataset.canFire = canFire ? "true" : "false";
  if (miniFireBtn) miniFireBtn.dataset.canFire = canFire ? "true" : "false";
  fireBtn.textContent = isTouchDevice ? "◎ ירי" : "◎ ירי / F";
  touchFireBtn.textContent = "◎ ירי";
  touchFireBtn.setAttribute("aria-label", "ירי לא זמין");

  if (canFire) {
    fireBtn.textContent = isTouchDevice ? "◎ ירי" : "◎ ירי / F";
    touchFireBtn.textContent = "◎ ירי";
    fireBtn.setAttribute("aria-label", `ירי עם בלסטר, נותרו ${ammoCount} יריות`);
    touchFireBtn.setAttribute("aria-label", `ירי עם בלסטר, נותרו ${ammoCount} יריות`);
    if (miniFireBtn) {
      miniFireBtn.textContent = "◎";
      miniFireBtn.setAttribute("aria-label", `ירי עם בלסטר, נותרו ${ammoCount} יריות`);
    }
  } else {
    fireBtn.textContent = isTouchDevice ? "◎ ירי" : "◎ ירי / F";
    touchFireBtn.textContent = "◎ ירי";
    fireBtn.setAttribute("aria-label", ammoCount > 0 ? "ירי עם בלסטר" : "אין תחמושת לירי");
    touchFireBtn.setAttribute("aria-label", "ירי לא זמין");
    if (miniFireBtn) {
      miniFireBtn.textContent = "◎";
      miniFireBtn.setAttribute("aria-label", ammoCount > 0 ? "ירי עם בלסטר" : "אין תחמושת לירי");
    }
  }

  const visibleButtons = [startBtn, pauseBtn, restartBtn, fireBtn].filter((button) => !button.hidden).length;
  if (controlsEl) {
    controlsEl.dataset.hasAction = showFireAction ? "true" : "false";
    controlsEl.style.setProperty("--control-cols", String(Math.max(visibleButtons, 1)));
  }

  if (miniPauseBtn) {
    miniPauseBtn.disabled = !started || gameOverAt > 0 || gadgetHelpOpen || isCountingDown || controlsBlocked;
    miniPauseBtn.textContent = running ? "❚❚" : "▶";
    miniPauseBtn.setAttribute("aria-label", running ? "השהה משחק" : "המשך משחק");
  }
  if (homeContinueBtn) homeContinueBtn.hidden = !getCanContinueRun();
}

function setTouchSettingsOpen(isOpen) {
  if (!touchSettingsToggle || !touchSettingsPanel) return;
  touchSettingsPanel.hidden = !isOpen;
  touchSettingsToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  touchSettingsToggle.setAttribute(
    "aria-label",
    isOpen ? "סגור הגדרות מגע" : "פתח הגדרות מגע"
  );
}

function toggleTouchSettings() {
  if (!touchSettingsPanel) return;
  setTouchSettingsOpen(touchSettingsPanel.hidden);
  requestAnimationFrame(syncViewportLayout);
}

function fireWeapon() {
  if (!running || gameOverAt > 0 || gadgetHelpOpen || resumeCountdown || hasBlockingOverlayOpen()) return;
  if (playerPowerState.blasterCharges <= 0) {
    setTemporaryStatus("אין תחמושת לירי", 850);
    updateActionButtons();
    focusGameSurface();
    return;
  }

  const head = snake[0];
  const trace = getShotTrace();
  if (trace.length === 0) {
    focusGameSurface();
    return;
  }

  playerPowerState.blasterCharges -= 1;
  currentRunStats.shots += 1;

  const { enemyHits, obstacleHits } = getShotHits(trace);
  const hitKeys = new Set([...enemyHits, ...obstacleHits].map((target) => `${target.x}:${target.y}`));
  const shotEnd = trace[trace.length - 1];

  laserShot = {
    from: { ...head },
    to: { ...shotEnd },
    start: performance.now()
  };

  if (enemyHits.length > 0) {
    enemies = enemies.filter((enemy) => !hitKeys.has(`${enemy.x}:${enemy.y}`));
    currentRunStats.enemyKills += enemyHits.length;
    enemyHits.forEach((enemy, index) => {
      addFloatingText(`+2`, enemy.x, enemy.y - index * 0.08, "#d9b3ff");
      activeExplosionBursts.push({
        x: enemy.x,
        y: enemy.y,
        start: performance.now(),
        duration: reducedMotionEnabled ? 220 : 320
      });
    });
  }

  if (obstacleHits.length > 0) {
    obstacles = obstacles.filter((obstacle) => !hitKeys.has(`${obstacle.x}:${obstacle.y}`));
    currentRunStats.obstacleBreaks += obstacleHits.length;
    obstacleHits.forEach((obstacle) => {
      addFloatingText("פיצוץ", obstacle.x, obstacle.y, "#9fd8ff");
      activeExplosionBursts.push({
        x: obstacle.x,
        y: obstacle.y,
        start: performance.now(),
        duration: reducedMotionEnabled ? 220 : 320
      });
    });
  }

  const pointsEarned = enemyHits.length * 2 + obstacleHits.length;
  if (pointsEarned > 0) {
    score += pointsEarned;
    scoreEl.textContent = String(score);
    if (score > bestScore) {
      bestScore = score;
      bestEl.textContent = String(bestScore);
      localStorage.setItem(STORAGE_KEYS.bestScore, String(bestScore));
    }
    updateLevel();
    updateSpeedIfNeeded();
  }

  boardShakeUntil = performance.now() + (reducedMotionEnabled ? 90 : 140);
  triggerBoardFlash("weapon");
  playSound("weapon");
  updateAmmoHud();
  updateHazardsLabel();
  updateAbilityLabel();
  updateActionButtons();

  if (enemyHits.length || obstacleHits.length) {
    const summary = [
      enemyHits.length > 0 ? `${enemyHits.length} אויבים` : "",
      obstacleHits.length > 0 ? `${obstacleHits.length} מכשולים` : ""
    ].filter(Boolean).join(" + ");
    setTemporaryStatus(`לייזר פגע: ${summary}`, 900);
  } else {
    setTemporaryStatus("לייזר נורה", 650);
  }
  focusGameSurface();
}

function formatPickupName(type) {
  switch (type) {
    case "shield":
      return "מגן";
    case "blaster":
      return "תחמושת";
    case "slow":
      return "האטה";
    default:
      return type;
  }
}

function getDifficultyConfig() {
  return DIFFICULTY_PRESETS[difficulty];
}

function getThemeConfig() {
  return BACKGROUND_THEMES[activeTheme];
}

function getSkinConfig() {
  return SNAKE_SKINS[activeSkin];
}

function normalizeKey(value, source, fallback) {
  if (value && Object.prototype.hasOwnProperty.call(source, value)) {
    return value;
  }
  return fallback;
}

function createDefaultProgressionProfile() {
  return {
    level: 1,
    xp: 0,
    totalRuns: 0,
    totalScore: 0,
    totalFruit: 0,
    totalEnemyKills: 0,
    totalObstacleBreaks: 0,
    totalPickups: 0,
    totalPortals: 0,
    totalShots: 0,
    totalPlaySeconds: 0,
    bestLevel: 1,
    achievements: {}
  };
}

function loadProgressionProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.progressionProfile);
    if (!raw) return createDefaultProgressionProfile();
    const parsed = JSON.parse(raw);
    return {
      ...createDefaultProgressionProfile(),
      ...parsed,
      achievements: parsed?.achievements && typeof parsed.achievements === "object" ? parsed.achievements : {}
    };
  } catch {
    return createDefaultProgressionProfile();
  }
}

function saveProgressionProfile() {
  localStorage.setItem(STORAGE_KEYS.progressionProfile, JSON.stringify(progressionProfile));
}

function createEmptyRunStats() {
  return {
    startedAt: 0,
    durationMs: 0,
    fruits: 0,
    enemyKills: 0,
    obstacleBreaks: 0,
    pickups: 0,
    portals: 0,
    shots: 0,
    maxLevel: 1
  };
}

function getLocalDayStamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 2147483647;
  }
  return Math.abs(hash);
}

function buildDailyChallenge(def, seed, index) {
  const target = def.targets[(seed + index) % def.targets.length];
  return {
    id: def.id,
    type: def.type,
    title: def.title,
    description: def.description(target),
    target,
    rewardXp: def.rewardXp,
    progress: 0,
    completed: false
  };
}

function buildDailyChallengesForToday() {
  const dateStamp = getLocalDayStamp();
  const seed = hashString(dateStamp);
  const pool = [...DAILY_CHALLENGE_DEFS];
  const challenges = [];

  for (let i = 0; i < 3 && pool.length > 0; i += 1) {
    const pickIndex = (seed + i * 7) % pool.length;
    const [def] = pool.splice(pickIndex, 1);
    challenges.push(buildDailyChallenge(def, seed, i));
  }

  return { dateStamp, challenges };
}

function loadDailyChallenges() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.dailyChallenges);
    const parsed = raw ? JSON.parse(raw) : null;
    if (!parsed || parsed.dateStamp !== getLocalDayStamp() || !Array.isArray(parsed.challenges)) {
      return buildDailyChallengesForToday();
    }
    return parsed;
  } catch {
    return buildDailyChallengesForToday();
  }
}

function saveDailyChallenges() {
  localStorage.setItem(STORAGE_KEYS.dailyChallenges, JSON.stringify(dailyChallenges));
}

function syncDailyChallenges() {
  if (!dailyChallenges || dailyChallenges.dateStamp !== getLocalDayStamp()) {
    dailyChallenges = buildDailyChallengesForToday();
    saveDailyChallenges();
  }
}

function getXpGoalForLevel(levelNumber) {
  return 100 + (levelNumber - 1) * 55;
}

function addProfileXp(amount) {
  let leveledUp = 0;
  progressionProfile.xp += Math.max(0, amount);

  while (progressionProfile.xp >= getXpGoalForLevel(progressionProfile.level)) {
    progressionProfile.xp -= getXpGoalForLevel(progressionProfile.level);
    progressionProfile.level += 1;
    leveledUp += 1;
  }

  saveProgressionProfile();
  return leveledUp;
}

function isThemeUnlocked(key) {
  return progressionProfile.level >= (BACKGROUND_THEMES[key]?.unlockLevel || 1);
}

function isSkinUnlocked(key) {
  return progressionProfile.level >= (SNAKE_SKINS[key]?.unlockLevel || 1);
}

function getUnlockedThemeKeys() {
  return Object.keys(BACKGROUND_THEMES).filter(isThemeUnlocked);
}

function getUnlockedSkinKeys() {
  return Object.keys(SNAKE_SKINS).filter(isSkinUnlocked);
}

function getFirstUnlockedTheme() {
  return getUnlockedThemeKeys()[0] || "neon";
}

function getFirstUnlockedSkin() {
  return getUnlockedSkinKeys()[0] || "classic";
}

function populateCustomizationSelects() {
  if (themeSelect) {
    const previous = activeTheme;
    themeSelect.innerHTML = Object.entries(BACKGROUND_THEMES)
      .map(([key, theme]) => {
        const unlocked = isThemeUnlocked(key);
        const suffix = unlocked ? "" : ` • רמה ${theme.unlockLevel}`;
        return `<option value="${key}"${unlocked ? "" : " disabled"}>${escapeHtml(theme.label + suffix)}</option>`;
      })
      .join("");
    if (!isThemeUnlocked(previous)) {
      activeTheme = getFirstUnlockedTheme();
      localStorage.setItem(STORAGE_KEYS.theme, activeTheme);
    }
    themeSelect.value = activeTheme;
  }

  if (snakeSkinSelect) {
    const previous = activeSkin;
    snakeSkinSelect.innerHTML = Object.entries(SNAKE_SKINS)
      .map(([key, skin]) => {
        const unlocked = isSkinUnlocked(key);
        const suffix = unlocked ? "" : ` • רמה ${skin.unlockLevel}`;
        return `<option value="${key}"${unlocked ? "" : " disabled"}>${escapeHtml(skin.label + suffix)}</option>`;
      })
      .join("");
    if (!isSkinUnlocked(previous)) {
      activeSkin = getFirstUnlockedSkin();
      localStorage.setItem(STORAGE_KEYS.snakeSkin, activeSkin);
    }
    snakeSkinSelect.value = activeSkin;
  }
}

function renderProgressionCard() {
  if (!playerLevelBadgeEl || !playerXpFillEl) return;
  const goal = getXpGoalForLevel(progressionProfile.level);
  const percent = Math.max(0, Math.min(100, (progressionProfile.xp / goal) * 100));

  playerLevelBadgeEl.textContent = `רמה ${progressionProfile.level}`;
  playerXpLabelEl.textContent = `${progressionProfile.xp} / ${goal} XP`;
  playerXpHintEl.textContent = `עוד ${Math.max(0, goal - progressionProfile.xp)} XP לרמה הבאה`;
  playerXpFillEl.style.width = `${percent}%`;
  careerRunsValueEl.textContent = String(progressionProfile.totalRuns);
  careerBestLevelValueEl.textContent = String(Math.max(1, progressionProfile.bestLevel));
  careerKillsValueEl.textContent = String(progressionProfile.totalEnemyKills);
  careerPickupsValueEl.textContent = String(progressionProfile.totalPickups);
}

function renderDailyChallenges() {
  if (!dailyChallengeListEl || !dailyChallengeDateEl) return;
  syncDailyChallenges();
  dailyChallengeDateEl.textContent = dailyChallenges.dateStamp;
  dailyChallengeListEl.innerHTML = dailyChallenges.challenges
    .map((challenge) => {
      const progress = Math.min(challenge.target, challenge.progress || 0);
      const percent = Math.max(0, Math.min(100, (progress / challenge.target) * 100));
      return `
        <article class="challenge-card ${challenge.completed ? "completed" : ""}">
          <div class="challenge-head">
            <div>
              <div class="challenge-title">${escapeHtml(challenge.title)}</div>
              <div class="challenge-meta">${escapeHtml(challenge.description)}</div>
            </div>
            <span class="challenge-pill">+${challenge.rewardXp} XP</span>
          </div>
          <div class="challenge-progress" aria-hidden="true">
            <div class="challenge-fill" style="width:${percent}%"></div>
          </div>
          <div class="challenge-meta">${progress} / ${challenge.target}${challenge.completed ? " • הושלם" : ""}</div>
        </article>`;
    })
    .join("");
}

function renderAchievements() {
  if (!achievementGridEl || !achievementSummaryEl) return;
  const unlockedCount = ACHIEVEMENT_DEFS.filter((achievement) => progressionProfile.achievements[achievement.id]).length;
  achievementSummaryEl.textContent = `${unlockedCount} / ${ACHIEVEMENT_DEFS.length}`;
  achievementGridEl.innerHTML = ACHIEVEMENT_DEFS.map((achievement) => {
    const unlocked = Boolean(progressionProfile.achievements[achievement.id]);
    return `
      <article class="achievement-card ${unlocked ? "unlocked" : "locked"}">
        <div class="achievement-head">
          <div>
            <div class="achievement-title">${escapeHtml(achievement.title)}</div>
            <div class="achievement-meta">${escapeHtml(achievement.description)}</div>
          </div>
          <span class="achievement-pill">${unlocked ? "נפתח" : "נעול"}</span>
        </div>
      </article>`;
  }).join("");
}

function hydrateProgressionStaticCopy() {
  const progressSection = playerLevelBadgeEl?.closest(".menu-panel-block");
  const progressLabels = progressSection?.querySelectorAll(".meta-stat small");
  if (progressSection) {
    const heading = progressSection.querySelector("h3");
    if (heading) heading.textContent = "התקדמות";
    progressSection.setAttribute("aria-label", "התקדמות שחקן");
  }
  if (progressLabels && progressLabels.length >= 4) {
    progressLabels[0].textContent = "ריצות";
    progressLabels[1].textContent = "שיא שלב";
    progressLabels[2].textContent = "חיסולים";
    progressLabels[3].textContent = "גאדג'טים";
  }

  const dailySection = dailyChallengeListEl?.closest(".menu-panel-block");
  if (dailySection) {
    const heading = dailySection.querySelector("h3");
    if (heading) heading.textContent = "משימות היום";
    dailySection.setAttribute("aria-label", "משימות יומיות");
  }

  const achievementSection = achievementGridEl?.closest(".menu-panel-block");
  if (achievementSection) {
    const heading = achievementSection.querySelector("h3");
    if (heading) heading.textContent = "הישגים";
    achievementSection.setAttribute("aria-label", "הישגים");
  }

  if (runResultsPanel) {
    runResultsPanel.setAttribute("aria-label", "סיכום ריצה");
  }
  if (runResultsMenuBtn) runResultsMenuBtn.textContent = "לתפריט";
  if (runResultsRecordBtn) runResultsRecordBtn.textContent = "תעד שיא";
  if (runResultsRestartBtn) runResultsRestartBtn.textContent = "ריצה חדשה";

  const resultsBlocks = runResultsPanel?.querySelectorAll(".results-block h3");
  if (resultsBlocks && resultsBlocks.length >= 4) {
    resultsBlocks[0].textContent = "הריצה שלך";
    resultsBlocks[1].textContent = "פירוט ביצוע";
    resultsBlocks[2].textContent = "התקדמות חדשה";
    resultsBlocks[3].textContent = "משימות והישגים";
  }
  const resultStats = runResultsPanel?.querySelectorAll(".meta-stat small");
  if (resultStats && resultStats.length >= 4) {
    resultStats[0].textContent = "ניקוד";
    resultStats[1].textContent = "שלב";
    resultStats[2].textContent = "זמן";
    resultStats[3].textContent = "XP";
  }
}

function renderMetaProgressionUI() {
  hydrateProgressionStaticCopy();
  renderProgressionCard();
  renderDailyChallenges();
  renderAchievements();
  populateCustomizationSelects();
}

function applyChallengeProgress(type, value, mode = "add") {
  syncDailyChallenges();
  const completed = [];

  dailyChallenges.challenges.forEach((challenge) => {
    if (challenge.type !== type || challenge.completed) return;

    if (mode === "max") {
      challenge.progress = Math.max(challenge.progress || 0, value);
    } else {
      challenge.progress = (challenge.progress || 0) + value;
    }

    if (challenge.progress >= challenge.target) {
      challenge.progress = challenge.target;
      challenge.completed = true;
      completed.push(challenge);
    }
  });

  if (completed.length > 0) {
    saveDailyChallenges();
  } else if (mode === "add" || mode === "max") {
    saveDailyChallenges();
  }

  return completed;
}

function unlockAchievements() {
  const unlocked = [];
  ACHIEVEMENT_DEFS.forEach((achievement) => {
    if (progressionProfile.achievements[achievement.id]) return;
    if (!achievement.check(progressionProfile)) return;
    progressionProfile.achievements[achievement.id] = new Date().toISOString();
    unlocked.push(achievement);
  });
  if (unlocked.length > 0) saveProgressionProfile();
  return unlocked;
}

function collectCosmeticUnlocks(previousLevel, currentLevel) {
  const unlocks = [];

  Object.entries(BACKGROUND_THEMES).forEach(([_key, theme]) => {
    if (theme.unlockLevel > previousLevel && theme.unlockLevel <= currentLevel) {
      unlocks.push(`נפתח רקע חדש: ${theme.label}`);
    }
  });

  Object.entries(SNAKE_SKINS).forEach(([_key, skin]) => {
    if (skin.unlockLevel > previousLevel && skin.unlockLevel <= currentLevel) {
      unlocks.push(`נפתח סקין חדש: ${skin.label}`);
    }
  });

  return unlocks;
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function renderRunResults() {
  if (!lastRunResults || !runResultsSummaryEl) return;

  runResultsTitleEl.textContent = lastRunResults.title;
  runResultsLevelBadgeEl.textContent = `רמה ${progressionProfile.level}`;
  runResultsSummaryEl.textContent = lastRunResults.summary;
  runStatScoreEl.textContent = String(lastRunResults.score);
  runStatLevelEl.textContent = String(lastRunResults.level);
  runStatTimeEl.textContent = formatDuration(lastRunResults.durationMs);
  runStatXpEl.textContent = `+${lastRunResults.xpEarned}`;

  runBreakdownListEl.innerHTML = lastRunResults.breakdown
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  runUnlockListEl.innerHTML = lastRunResults.unlocks.length > 0
    ? lastRunResults.unlocks.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
    : "<li>לא נפתחו פריטים חדשים בריצה הזאת</li>";
  runMilestoneListEl.innerHTML = lastRunResults.milestones.length > 0
    ? lastRunResults.milestones.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
    : "<li>לא הושלמו הישגים או משימות חדשות</li>";

  if (runResultsRecordBtn) {
    runResultsRecordBtn.hidden = !pendingScoreEntry;
  }
}

function finalizeRunProgress(reason) {
  currentRunStats.durationMs = currentRunStats.startedAt > 0 ? performance.now() - currentRunStats.startedAt : 0;
  currentRunStats.maxLevel = Math.max(currentRunStats.maxLevel, level);

  const previousLevel = progressionProfile.level;
  progressionProfile.totalRuns += 1;
  progressionProfile.totalScore += score;
  progressionProfile.totalFruit += currentRunStats.fruits;
  progressionProfile.totalEnemyKills += currentRunStats.enemyKills;
  progressionProfile.totalObstacleBreaks += currentRunStats.obstacleBreaks;
  progressionProfile.totalPickups += currentRunStats.pickups;
  progressionProfile.totalPortals += currentRunStats.portals;
  progressionProfile.totalShots += currentRunStats.shots;
  progressionProfile.totalPlaySeconds += Math.round(currentRunStats.durationMs / 1000);
  progressionProfile.bestLevel = Math.max(progressionProfile.bestLevel, currentRunStats.maxLevel);
  saveProgressionProfile();

  const dailyUnlocked = [
    ...applyChallengeProgress("runs", 1),
    ...applyChallengeProgress("maxScore", score, "max"),
    ...applyChallengeProgress("pickups", currentRunStats.pickups),
    ...applyChallengeProgress("enemyKills", currentRunStats.enemyKills),
    ...applyChallengeProgress("portals", currentRunStats.portals)
  ];

  const xpEarned =
    20 +
    score * 8 +
    currentRunStats.maxLevel * 10 +
    currentRunStats.enemyKills * 12 +
    currentRunStats.pickups * 8 +
    currentRunStats.portals * 6 +
    dailyUnlocked.reduce((sum, challenge) => sum + challenge.rewardXp, 0);

  const levelsGained = addProfileXp(xpEarned);
  const newAchievements = unlockAchievements();
  const cosmeticUnlocks = collectCosmeticUnlocks(previousLevel, progressionProfile.level);

  if (xpEarned > 0) {
    pulseProgressionUI();
    pushToast(`+${xpEarned} XP`, "הפרופיל התעדכן בסוף הריצה", "accent");
  }
  if (levelsGained > 0) {
    pushToast(
      levelsGained > 1 ? `עלית ${levelsGained} רמות` : "עלית רמה",
      `פרופיל ${progressionProfile.level}`,
      "success"
    );
  }
  dailyUnlocked.forEach((challenge) => {
    pushToast("משימה הושלמה", challenge.title, "warn");
  });
  newAchievements.forEach((achievement) => {
    pushToast("הישג חדש", achievement.title, "success");
  });
  cosmeticUnlocks.slice(0, 2).forEach((unlockText) => {
    pushToast("נפתח פריט חדש", unlockText, "accent");
  });

  const milestones = [
    ...dailyUnlocked.map((challenge) => `הושלמה משימה: ${challenge.title}`),
    ...newAchievements.map((achievement) => `הישג חדש: ${achievement.title}`)
  ];

  const unlocks = [];
  if (levelsGained > 0) {
    unlocks.push(`עלית ${levelsGained > 1 ? `${levelsGained} רמות` : "רמה"} לפרופיל`);
  }
  unlocks.push(...cosmeticUnlocks);

  lastRunResults = {
    title: score > 0 ? "סיכום הריצה" : "ריצה הסתיימה",
    summary: `${reason} | ניקוד ${score} | שלב ${level}`,
    score,
    level,
    durationMs: currentRunStats.durationMs,
    xpEarned,
    breakdown: [
      `פירות שנאספו: ${currentRunStats.fruits}`,
      `אויבים שחוסלו: ${currentRunStats.enemyKills}`,
      `מכשולים שפוצצו: ${currentRunStats.obstacleBreaks}`,
      `גאדג'טים שנאספו: ${currentRunStats.pickups}`,
      `מעברי פורטל: ${currentRunStats.portals}`
    ],
    unlocks,
    milestones
  };

  renderMetaProgressionUI();
  renderRunResults();
}

function setRunResultsOpen(isOpen) {
  if (!runResultsPanel) return;
  if (isOpen && menuPanel) menuPanel.hidden = true;
  if (isOpen && leaderboardPanel) leaderboardPanel.hidden = true;
  if (isOpen && recordScorePanel) recordScorePanel.hidden = true;
  if (isOpen && gadgetHelpPanel) gadgetHelpPanel.hidden = true;
  runResultsPanel.hidden = !isOpen;
  if (isOpen) renderRunResults();
  updatePlayLayoutState();
  updateActionButtons();
  if (!isOpen && started && gameOverAt === 0) focusGameSurface();
}

function getIdleStatus() {
  return isTouchDevice
    ? "לחץ על התחל, החליק על הלוח או השתמש בבקרים"
    : "לחץ על התחל או על מקשי החצים";
}

function loadPersonalRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.personalRecords);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadCommunityFallbackRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.communityFallbackRecords);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistCommunityFallbackRecords() {
  localStorage.setItem(
    STORAGE_KEYS.communityFallbackRecords,
    JSON.stringify(communityFallbackRecords.slice(0, MAX_COMMUNITY_RECORDS))
  );
}

function sortScoreEntries(entries, limit) {
  return [...entries]
    .sort((a, b) => b.score - a.score || b.level - a.level)
    .slice(0, limit);
}

function buildScoreEntry(overrideName = playerName) {
  return {
    player: sanitizePlayerName(overrideName),
    score,
    level,
    difficulty: getDifficultyConfig().label,
    recordedAt: new Date().toISOString()
  };
}

function savePersonalScore(entry) {
  personalRecords = sortScoreEntries([entry, ...personalRecords], MAX_PERSONAL_RECORDS);
  localStorage.setItem(STORAGE_KEYS.personalRecords, JSON.stringify(personalRecords));
}

function getOfflineCommunityRecords() {
  return sortScoreEntries(
    [...communityFallbackRecords, ...getDemoCommunityRecords()],
    MAX_COMMUNITY_RECORDS
  );
}

function renderLeaderboards() {
  if (playerNameInput) playerNameInput.value = playerName;
  renderLeaderboardList(localLeaderboardListEl, personalRecords, true);
  renderLeaderboardList(globalLeaderboardListEl, communityRecords, false);

  const personalBest = personalRecords[0]?.score || 0;
  if (personalBestSummaryEl) {
    personalBestSummaryEl.textContent = `${personalBest} נק'`;
  }

  if (communityStatusEl) {
    communityStatusEl.textContent = communityStatus.detail;
  }

  if (communityModeBadgeEl) {
    communityModeBadgeEl.textContent = communityStatus.mode;
  }
}

function renderLeaderboardList(target, entries, includeMeta) {
  if (!target) return;

  if (!entries || entries.length === 0) {
    target.innerHTML = "<li><span>עדיין אין שיאים</span><span>שחק ריצה אחת</span></li>";
    return;
  }

  target.innerHTML = entries
    .slice(0, includeMeta ? MAX_PERSONAL_RECORDS : MAX_COMMUNITY_RECORDS)
    .map((entry) => {
      const rightLabel = includeMeta
        ? `שלב ${entry.level} | ${entry.difficulty}`
        : `${entry.score} נק'`;
      const leftLabel = includeMeta
        ? `${entry.score} נק'`
        : `${entry.player}`;
      const primary = includeMeta ? entry.player : leftLabel;
      return `<li><span>${escapeHtml(primary)}</span><span>${escapeHtml(includeMeta ? leftLabel + " | " + rightLabel : rightLabel)}</span></li>`;
    })
    .join("");
}

async function loadCommunityLeaderboard() {
  if (!COMMUNITY_LEADERBOARD_ENDPOINT) {
    communityRecords = getOfflineCommunityRecords();
    communityStatus = {
      mode: communityFallbackRecords.length > 0 ? "דמו מקומי" : "דמו לא מקוון",
      detail: communityFallbackRecords.length > 0
        ? "השיאים המשותפים נשמרים כרגע בדמו המקומי של המכשיר"
        : "כדי להפעיל לוח קהילתי אמיתי צריך לחבר צד שרת"
    };
    renderLeaderboards();
    return;
  }

  communityStatus = {
    mode: "מחובר",
    detail: "טוען את הלוח הקהילתי..."
  };
  renderLeaderboards();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1800);
    const response = await fetch(COMMUNITY_LEADERBOARD_ENDPOINT, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`Leaderboard request failed (${response.status})`);
    const payload = await response.json();
    communityRecords = Array.isArray(payload)
      ? payload.slice(0, MAX_COMMUNITY_RECORDS)
      : getOfflineCommunityRecords();
    communityStatus = {
      mode: "חי",
      detail: "הלוח הקהילתי מחובר"
    };
  } catch {
    communityRecords = getOfflineCommunityRecords();
    communityStatus = {
      mode: communityFallbackRecords.length > 0 ? "דמו מקומי" : "דמו לא מקוון",
      detail: communityFallbackRecords.length > 0
        ? "השרת לא זמין, לכן מוצג כרגע הלוח המשותף המקומי"
        : "הלוח הקהילתי חזר למצב גיבוי כי השרת לא זמין"
    };
  }

  renderLeaderboards();
}

async function submitCommunityScore(entry) {
  if (!COMMUNITY_LEADERBOARD_ENDPOINT) {
    communityFallbackRecords = sortScoreEntries(
      [entry, ...communityFallbackRecords],
      MAX_COMMUNITY_RECORDS
    );
    persistCommunityFallbackRecords();
    communityRecords = getOfflineCommunityRecords();
    communityStatus = {
      mode: "דמו מקומי",
      detail: "השיא נשמר בלוח הקהילה המקומי עד שיחובר שרת אמיתי"
    };
    renderLeaderboards();
    return;
  }

  try {
    await fetch(COMMUNITY_LEADERBOARD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    });
    await loadCommunityLeaderboard();
  } catch {
    communityStatus = {
      mode: "דמו מקומי",
      detail: "שליחת השיא נכשלה, לכן הוא נשמר כרגע בלוח הקהילה המקומי"
    };
    communityFallbackRecords = sortScoreEntries(
      [entry, ...communityFallbackRecords],
      MAX_COMMUNITY_RECORDS
    );
    persistCommunityFallbackRecords();
    communityRecords = getOfflineCommunityRecords();
    renderLeaderboards();
  }
}

function getDemoCommunityRecords() {
  return [
    { player: "רץ־בייט", score: 92, level: 14, difficulty: "קשה" },
    { player: "שועל־גריד", score: 71, level: 11, difficulty: "בינוני" },
    { player: "צלופח־לייזר", score: 58, level: 9, difficulty: "קשה" },
    { player: "זנב־נובה", score: 43, level: 8, difficulty: "בינוני" },
    { player: "טייס־ארקייד", score: 30, level: 6, difficulty: "קל" }
  ];
}

function sanitizePlayerName(value) {
  const trimmed = (value || "").trim().slice(0, 14);
  return trimmed || "שחקן";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function getSelectedRecordDestination() {
  const selected = [...recordDestinationInputs].find((input) => input.checked);
  return selected?.value || "personal";
}

function setRecordDestination(value) {
  const normalized = ["personal", "community", "both"].includes(value) ? value : "personal";
  recordDestinationInputs.forEach((input) => {
    input.checked = input.value === normalized;
  });
}

function updateRecordScoreSummary() {
  if (!recordScoreSummaryEl) return;

  if (!pendingScoreEntry) {
    recordScoreSummaryEl.textContent = "אין כרגע שיא זמין לתיעוד.";
    return;
  }

  recordScoreSummaryEl.textContent =
    `ניקוד ${pendingScoreEntry.score} | שלב ${pendingScoreEntry.level} | ` +
    `קושי ${pendingScoreEntry.difficulty}. בחר איך לשמור את הריצה הזאת.`;
}

function setRecordScoreOpen(isOpen) {
  if (!recordScorePanel) return;

  if (isOpen && menuPanel) menuPanel.hidden = true;
  if (isOpen && leaderboardPanel) leaderboardPanel.hidden = true;
  if (isOpen && gadgetHelpPanel) gadgetHelpPanel.hidden = true;
  if (isOpen && runResultsPanel) runResultsPanel.hidden = true;

  recordScorePanel.hidden = !isOpen;
  if (isOpen) {
    setRecordDestination("both");
    updateRecordScoreSummary();
    if (recordPlayerNameInput) {
      recordPlayerNameInput.value = pendingScoreEntry?.player || playerName;
      recordPlayerNameInput.focus({ preventScroll: true });
      recordPlayerNameInput.select();
    }
  }
  updatePlayLayoutState();
  updateActionButtons();
  if (!isOpen && started && gameOverAt === 0) focusGameSurface();
}

async function submitPendingScoreRecord() {
  if (!pendingScoreEntry) return;

  const finalName = sanitizePlayerName(recordPlayerNameInput?.value || playerName);
  setPlayerName(finalName);

  const entry = {
    ...pendingScoreEntry,
    player: finalName,
    recordedAt: new Date().toISOString()
  };
  const destination = getSelectedRecordDestination();

  if (destination === "personal" || destination === "both") {
    savePersonalScore(entry);
  }

  if (destination === "community" || destination === "both") {
    await submitCommunityScore(entry);
  } else {
    renderLeaderboards();
  }

  pendingScoreEntry = null;
  setRecordScoreOpen(false);
  setRunResultsOpen(false);
  initGame();
  setMenuOpen(true);
  statusEl.textContent = "השיא נשמר. אפשר לבחור קושי ולהתחיל ריצה חדשה";
}

function skipPendingScoreRecord() {
  pendingScoreEntry = null;
  setRecordScoreOpen(false);
  setRunResultsOpen(false);
  initGame();
  setMenuOpen(true);
  statusEl.textContent = "חזרת לתפריט הראשי";
}

function setLeaderboardOpen(isOpen) {
  if (!leaderboardPanel) return;
  if (isOpen && menuPanel) {
    menuPanel.hidden = true;
  }
  if (isOpen && authPanel) {
    authPanel.hidden = true;
    authOpen = false;
  }
  if (isOpen && gadgetHelpPanel) {
    gadgetHelpPanel.hidden = true;
  }
  if (isOpen && recordScorePanel) {
    recordScorePanel.hidden = true;
  }
  if (isOpen && runResultsPanel) {
    runResultsPanel.hidden = true;
  }
  leaderboardPanel.hidden = !isOpen;
  updatePlayLayoutState();
  updateActionButtons();
  if (!isOpen && started && gameOverAt === 0) focusGameSurface();
}

function setMenuOpen(isOpen) {
  if (!menuPanel) return;
  if (isOpen) setHomeOpen(false);
  if (isOpen && leaderboardPanel) {
    leaderboardPanel.hidden = true;
  }
  if (isOpen && authPanel) {
    authPanel.hidden = true;
    authOpen = false;
  }
  if (isOpen && gadgetHelpPanel) {
    gadgetHelpPanel.hidden = true;
  }
  if (isOpen && recordScorePanel) {
    recordScorePanel.hidden = true;
  }
  if (isOpen && runResultsPanel) {
    runResultsPanel.hidden = true;
  }
  menuPanel.hidden = !isOpen;
  updatePlayLayoutState();
  updateActionButtons();
  if (!isOpen && started && gameOverAt === 0) focusGameSurface();
}

function syncViewportLayout() {
  const viewportHeight = Math.round(window.visualViewport?.height || window.innerHeight);
  const viewportWidth = Math.round(window.visualViewport?.width || window.innerWidth);
  document.documentElement.style.setProperty("--app-height", `${viewportHeight}px`);
  if (!appWrapEl || !boardShellEl) return;

  const compactViewport = viewportWidth <= 820 || viewportHeight <= 920;
  appWrapEl.classList.toggle("compact-viewport", compactViewport);

  const bodyStyle = window.getComputedStyle(document.body);
  const bodyTop = parseFloat(bodyStyle.paddingTop) || 0;
  const bodyBottom = parseFloat(bodyStyle.paddingBottom) || 0;
  const wrapStyle = window.getComputedStyle(appWrapEl);
  const wrapPaddingTop = parseFloat(wrapStyle.paddingTop) || 0;
  const wrapPaddingBottom = parseFloat(wrapStyle.paddingBottom) || 0;
  const wrapPaddingInline = (parseFloat(wrapStyle.paddingLeft) || 0) + (parseFloat(wrapStyle.paddingRight) || 0);
  const rowGap = parseFloat(wrapStyle.rowGap || wrapStyle.gap) || 0;

  const visibleSections = [topbarEl, hudEl, controlsEl, touchControlsEl, footerEl].filter(
    (el) => el && window.getComputedStyle(el).display !== "none"
  );
  const sectionsHeight = visibleSections.reduce((sum, el) => sum + el.offsetHeight, 0);
  const gapsHeight = Math.max(0, visibleSections.length - 1) * rowGap;
  const chrome = bodyTop + bodyBottom + wrapPaddingTop + wrapPaddingBottom + sectionsHeight + gapsHeight + (compactViewport ? 8 : 18);
  const availableHeight = Math.max(200, viewportHeight - chrome);
  const availableWidth = Math.max(220, Math.min(appWrapEl.clientWidth, viewportWidth) - wrapPaddingInline - 6);
  const maxBoard = isTouchDevice
    ? (compactViewport ? 460 : 620)
    : (compactViewport ? 780 : 860);
  const size = Math.min(maxBoard, availableHeight, availableWidth);

  document.documentElement.style.setProperty("--mobile-board-size", `${Math.floor(size)}px`);
  document.documentElement.style.setProperty("--board-size", `${Math.floor(size)}px`);
}

function triggerBoardFlash(kind) {
  if (kind === "danger") {
    boardFlash = {
      start: performance.now(),
      duration: 260,
      alpha: 0.18,
      rgb: "255, 96, 96"
    };
    return;
  }

  if (kind === "level") {
    boardFlash = {
      start: performance.now(),
      duration: 260,
      alpha: 0.16,
      rgb: "120, 174, 255"
    };
    return;
  }

  if (kind === "pickup") {
    boardFlash = {
      start: performance.now(),
      duration: 220,
      alpha: 0.15,
      rgb: "130, 235, 183"
    };
    return;
  }

  if (kind === "shield") {
    boardFlash = {
      start: performance.now(),
      duration: 220,
      alpha: 0.17,
      rgb: "120, 221, 255"
    };
    return;
  }

  if (kind === "portal") {
    boardFlash = {
      start: performance.now(),
      duration: 200,
      alpha: 0.14,
      rgb: "156, 195, 255"
    };
    return;
  }

  if (kind === "weapon") {
    boardFlash = {
      start: performance.now(),
      duration: 160,
      alpha: 0.16,
      rgb: "217, 179, 255"
    };
    return;
  }

  boardFlash = {
    start: performance.now(),
    duration: 180,
    alpha: 0.14,
    rgb: "255, 215, 109"
  };
}

function addFloatingText(text, x, y, color) {
  floatingTexts.push({
    text,
    x,
    y,
    color,
    start: performance.now(),
    duration: 520
  });
}

function updateMiniHud() {
  if (miniScoreEl) miniScoreEl.textContent = String(score ?? 0);
  if (miniLevelEl) miniLevelEl.textContent = String(level ?? 1);
  updateAmmoHud();
  if (miniAbilityEl) miniAbilityEl.textContent = abilityLabelEl?.textContent || "";
}

function getShotTrace() {
  const cells = [];
  const activeDirection = nextDirection || direction || { x: 1, y: 0 };
  const shotDirection = activeDirection.x === 0 && activeDirection.y === 0
    ? { x: 1, y: 0 }
    : activeDirection;
  let cursor = { ...snake[0] };

  while (true) {
    cursor = {
      x: cursor.x + shotDirection.x,
      y: cursor.y + shotDirection.y
    };
    if (isWallCollision(cursor)) break;
    cells.push({ ...cursor });
  }

  return cells;
}

function getShotHits(trace) {
  const hitKeys = new Set(trace.map((cell) => `${cell.x}:${cell.y}`));
  const enemyHits = enemies.filter((enemy) => hitKeys.has(`${enemy.x}:${enemy.y}`));
  const obstacleHits = obstacles.filter((obstacle) => hitKeys.has(`${obstacle.x}:${obstacle.y}`));
  return { enemyHits, obstacleHits };
}

if (GADGET_HELP.blaster) {
  GADGET_HELP.blaster.title = "תחמושת לייזר";
  GADGET_HELP.blaster.description = "איסוף תחמושת מוסיף עוד יריות ללייזר הישר של הנחש. הירי פוגע בכל אויב או מכשול שנמצא בקו התנועה הנוכחי.";
}

function getBoardShakeOffset(nowMs) {
  if (reducedMotionEnabled) {
    return { x: 0, y: 0 };
  }

  if (nowMs >= boardShakeUntil) {
    return { x: 0, y: 0 };
  }

  const intensity = (boardShakeUntil - nowMs) / 80;
  return {
    x: Math.sin(nowMs * 0.09) * intensity,
    y: Math.cos(nowMs * 0.11) * intensity
  };
}

function withAlpha(color, alpha) {
  if (color.startsWith("rgba(")) {
    const values = color.slice(5, -1).split(",").map((part) => part.trim());
    return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${alpha})`;
  }

  if (color.startsWith("rgb(")) {
    return color.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  }

  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const normalized = hex.length === 3
      ? hex.split("").map((ch) => ch + ch).join("")
      : hex;
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return color;
}

function shuffleCopy(list) {
  const copy = list.map((item) => ({ ...item }));
  shuffleInPlace(copy);
  return copy;
}

function shuffleInPlace(list) {
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = list[i];
    list[i] = list[j];
    list[j] = tmp;
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startRenderLoop() {
  if (rafId) return;

  const render = (time) => {
    draw(time);
    rafId = requestAnimationFrame(render);
  };

  rafId = requestAnimationFrame(render);
}

window.addEventListener("resize", applyControlLayout);
window.addEventListener("resize", syncViewportLayout);
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", syncViewportLayout);
  window.visualViewport.addEventListener("scroll", syncViewportLayout);
}
window.addEventListener("keydown", onKeyDown, { capture: true });
startBtn.addEventListener("click", handlePrimaryButtonClick);
pauseBtn.addEventListener("click", togglePause);
restartBtn.addEventListener("click", handleRestartButtonClick);
fireBtn.addEventListener("click", fireWeapon);
menuBtn.addEventListener("click", () => setMenuOpen(true));
recordsBtn.addEventListener("click", () => setLeaderboardOpen(true));
touchFireBtn.addEventListener("click", fireWeapon);
if (miniPauseBtn) miniPauseBtn.addEventListener("click", togglePause);
if (miniFireBtn) miniFireBtn.addEventListener("click", fireWeapon);
if (miniMenuBtn) miniMenuBtn.addEventListener("click", () => setMenuOpen(true));

if (homePrimaryBtn) {
  homePrimaryBtn.addEventListener("click", () => {
    startFreshRun();
  });
}

if (homeContinueBtn) {
  homeContinueBtn.addEventListener("click", () => {
    setHomeOpen(false);
    startGame();
  });
}

if (homeSettingsBtn) {
  homeSettingsBtn.addEventListener("click", () => {
    setHomeOpen(false);
    setMenuOpen(true);
  });
}

if (homeProgressBtn) {
  homeProgressBtn.addEventListener("click", () => {
    setHomeOpen(false);
    setMenuOpen(true);
    playerLevelBadgeEl?.scrollIntoView({ block: "nearest", behavior: reducedMotionEnabled ? "auto" : "smooth" });
  });
}

if (homeAccountBtn) {
  homeAccountBtn.addEventListener("click", () => setAuthOpen(true));
}

difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => setDifficulty(button.dataset.difficulty));
});

if (controlLayoutSelect) {
  controlLayoutSelect.addEventListener("change", () => setControlLayout(controlLayoutSelect.value));
}

if (menuControlLayoutSelect) {
  menuControlLayoutSelect.addEventListener("change", () => setControlLayout(menuControlLayoutSelect.value));
}

if (controlSizeSelect) {
  controlSizeSelect.addEventListener("change", () => setControlSize(controlSizeSelect.value));
}

if (menuControlSizeSelect) {
  menuControlSizeSelect.addEventListener("change", () => setControlSize(menuControlSizeSelect.value));
}

if (controlSideSelect) {
  controlSideSelect.addEventListener("change", () => setControlSide(controlSideSelect.value));
}

if (menuControlSideSelect) {
  menuControlSideSelect.addEventListener("change", () => setControlSide(menuControlSideSelect.value));
}

if (touchSettingsToggle) {
  touchSettingsToggle.addEventListener("click", toggleTouchSettings);
}

if (closeLeaderboardBtn) {
  closeLeaderboardBtn.addEventListener("click", () => setLeaderboardOpen(false));
}

if (closeMenuBtn) {
  closeMenuBtn.addEventListener("click", () => setMenuOpen(false));
}

if (openAuthBtn) {
  openAuthBtn.addEventListener("click", () => setAuthOpen(true));
}

if (menuSignOutBtn) {
  menuSignOutBtn.addEventListener("click", () => {
    void handleSignOut();
  });
}

if (menuPanel) {
  menuPanel.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.hasAttribute("data-close-overlay")) {
      setMenuOpen(false);
    }
  });
}

if (leaderboardPanel) {
  leaderboardPanel.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.hasAttribute("data-close-overlay")) {
      setLeaderboardOpen(false);
    }
  });
}

if (recordScorePanel) {
  recordScorePanel.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.hasAttribute("data-close-overlay")) {
      skipPendingScoreRecord();
    }
  });
}

if (runResultsPanel) {
  runResultsPanel.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.hasAttribute("data-close-overlay")) {
      setRunResultsOpen(false);
      initGame();
      setMenuOpen(true);
    }
  });
}

if (closeRecordScoreBtn) {
  closeRecordScoreBtn.addEventListener("click", skipPendingScoreRecord);
}

if (skipRecordBtn) {
  skipRecordBtn.addEventListener("click", skipPendingScoreRecord);
}

if (submitRecordBtn) {
  submitRecordBtn.addEventListener("click", () => {
    void submitPendingScoreRecord();
  });
}

if (runResultsMenuBtn) {
  runResultsMenuBtn.addEventListener("click", () => {
    setRunResultsOpen(false);
    initGame();
    setMenuOpen(true);
  });
}

if (runResultsRecordBtn) {
  runResultsRecordBtn.addEventListener("click", () => {
    if (!pendingScoreEntry) {
      setRunResultsOpen(false);
      initGame();
      setMenuOpen(true);
      return;
    }
    setRunResultsOpen(false);
    setRecordScoreOpen(true);
  });
}

if (runResultsRestartBtn) {
  runResultsRestartBtn.addEventListener("click", () => {
    setRunResultsOpen(false);
    startFreshRun();
  });
}

if (playerNameInput) {
  playerNameInput.value = playerName;
  playerNameInput.addEventListener("change", () => {
    setPlayerName(playerNameInput.value);
  });
}

if (recordPlayerNameInput) {
  recordPlayerNameInput.value = playerName;
  recordPlayerNameInput.addEventListener("change", () => {
    recordPlayerNameInput.value = sanitizePlayerName(recordPlayerNameInput.value);
  });
}

if (profileNameInput) {
  profileNameInput.value = playerName;
  profileNameInput.addEventListener("change", () => {
    setPlayerName(profileNameInput.value);
  });
}

if (themeSelect) {
  themeSelect.addEventListener("change", () => setTheme(themeSelect.value));
}

if (snakeSkinSelect) {
  snakeSkinSelect.addEventListener("change", () => setSnakeSkin(snakeSkinSelect.value));
}

if (soundToggle) {
  soundToggle.addEventListener("change", () => {
    setAudioMuted(!soundToggle.checked);
    if (soundToggle.checked) {
      primeAudio();
      playSound("eat");
    }
  });
}

if (gadgetTipsToggle) {
  gadgetTipsToggle.addEventListener("change", () => {
    setGadgetTipsDisabled(!gadgetTipsToggle.checked);
  });
}

if (reducedMotionToggle) {
  reducedMotionToggle.addEventListener("change", () => {
    setReducedMotionEnabled(Boolean(reducedMotionToggle.checked));
  });
}

if (applyBackgroundUrlBtn && backgroundUrlInput) {
  applyBackgroundUrlBtn.addEventListener("click", () => {
    const value = backgroundUrlInput.value.trim();
    if (!value) {
      setCustomBoardBackground("");
      return;
    }
    setCustomBoardBackground(value);
  });
}

if (backgroundFileInput) {
  backgroundFileInput.addEventListener("change", () => {
    const file = backgroundFileInput.files?.[0];
    if (!file) return;
    if (file.size > 8_000_000) {
      boardBackgroundError = "בחר תמונה עד 8MB";
      updateCustomizationUI();
      backgroundFileInput.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (result) {
        setCustomBoardBackground(result);
      }
      backgroundFileInput.value = "";
    };
    reader.onerror = () => {
      boardBackgroundError = "העלאת התמונה נכשלה";
      updateCustomizationUI();
      backgroundFileInput.value = "";
    };
    reader.readAsDataURL(file);
  });
}

if (clearBackgroundBtn) {
  clearBackgroundBtn.addEventListener("click", () => {
    if (backgroundUrlInput) backgroundUrlInput.value = "";
    if (backgroundFileInput) backgroundFileInput.value = "";
    setCustomBoardBackground("");
  });
}

if (closeGadgetHelpBtn) {
  closeGadgetHelpBtn.addEventListener("click", closeGadgetHelp);
}

if (gadgetHelpPanel) {
  gadgetHelpPanel.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.hasAttribute("data-close-overlay")) {
      closeGadgetHelp();
    }
  });
}

if (closeAuthBtn) {
  closeAuthBtn.addEventListener("click", () => setAuthOpen(false));
}

if (guestCloseAuthBtn) {
  guestCloseAuthBtn.addEventListener("click", () => setAuthOpen(false));
}

if (googleAuthBtn) {
  googleAuthBtn.addEventListener("click", () => {
    void handleGoogleAuth();
  });
}

if (magicLinkForm) {
  magicLinkForm.addEventListener("submit", (event) => {
    void handleMagicLinkSubmit(event);
  });
}

if (authSignOutBtn) {
  authSignOutBtn.addEventListener("click", () => {
    void handleSignOut();
  });
}

if (authPanel) {
  authPanel.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.hasAttribute("data-close-overlay")) {
      setAuthOpen(false);
    }
  });
}

touchButtons.forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    setDirection(button.dataset.dir);
  });
});

canvas.addEventListener("pointerdown", onCanvasPointerDown);
canvas.addEventListener("pointerup", onCanvasPointerUp);
canvas.addEventListener("pointercancel", onCanvasPointerCancel);

document.addEventListener("touchend", onGlobalTouchEnd, { passive: false });
document.addEventListener("gesturestart", onGlobalGestureStart, { passive: false });
document.addEventListener("visibilitychange", () => {
  if (document.hidden && (running || resumeCountdown)) {
    pauseGame();
  }
});

if (authService?.subscribe) {
  authService.subscribe((nextState) => {
    const previousStatus = authSnapshot.status;
    const previousEmail = authSnapshot.user?.email || "";
    authSnapshot = nextState;
    updateAuthUI();
    if (nextState.status === "authenticated") {
      if (authOpen) setAuthOpen(false);
      if (previousStatus !== "authenticated" || previousEmail !== (nextState.user?.email || "")) {
        pushToast("התחברת בהצלחה", nextState.user?.email || "החשבון זמין עכשיו", "success");
      }
      return;
    }
    if (previousStatus === "authenticated" && nextState.status === "guest") {
      pushToast("חזרת למצב אורח", "המשחק וההתקדמות המקומית נשארו זמינים", "accent");
      return;
    }
    if (nextState.status === "guest" && typeof nextState.detail === "string" && nextState.detail.includes("קישור")) {
      pushToast("קישור נשלח", nextState.detail, "accent");
    }
  });
}

if (["127.0.0.1", "localhost"].includes(window.location.hostname)) {
  window.__snakeMeQa = {
    snapshot: getQaInputSnapshot
  };
}

setTheme(activeTheme);
setSnakeSkin(activeSkin);
setControlLayout(preferredControlLayout);
setControlSize(preferredControlSize);
setControlSide(preferredControlSide);
setTouchSettingsOpen(false);
setMenuOpen(false);
setLeaderboardOpen(false);
setAuthOpen(false);
loadBoardBackground(boardBackgroundSource);
initGame();
void loadCommunityLeaderboard();
updateAuthUI();
setHomeOpen(true);
syncViewportLayout();

