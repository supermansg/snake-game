const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
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
const touchButtons = document.querySelectorAll("[data-dir]");
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

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
  gadgetTipsSeen: "snake_gadget_tips_seen"
};

const DEFAULT_BOARD_BACKGROUND = "./defualt background.png";

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
    head: "#54e3a5",
    body: "#2fc487",
    eye: "#082a1e",
    headGlow: "rgba(84, 227, 165, 0.26)",
    bodyGlow: "rgba(47, 196, 135, 0.14)",
    highlight: "rgba(222, 255, 241, 0.32)"
  },
  cobalt: {
    head: "#77b2ff",
    body: "#4c8fff",
    eye: "#0b1d3b",
    headGlow: "rgba(119, 178, 255, 0.24)",
    bodyGlow: "rgba(76, 143, 255, 0.14)",
    highlight: "rgba(230, 242, 255, 0.28)"
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
  blasterCharges: 0,
  slowUntil: 0
};
let laserShot = null;
let aimingShot = false;
let targetCursor = null;
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
let audioContext = null;
let gadgetHelpOpen = false;
let gadgetHelpResumeAfterClose = false;
let activeGadgetHelpType = "";
let pendingScoreEntry = null;

bestEl.textContent = String(bestScore);

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
    blasterCharges: 0,
    slowUntil: 0
  };
  laserShot = null;
  aimingShot = false;
  targetCursor = null;
  pendingScoreEntry = null;

  clearStatusTimer();
  updateDifficultyButtons();
  applyControlLayout();
  updateTouchControlSettingsUI();
  updateCustomizationUI();
  updateModeLabel();
  updateAbilityLabel();
  updatePlayLayoutState();
  renderLeaderboards();
  syncViewportLayout();

  scoreEl.textContent = "0";
  levelEl.textContent = String(level);
  updateHazardsLabel();
  statusEl.textContent = getIdleStatus();
  updateMiniHud();

  updateActionButtons();
  stopLoop();
  startRenderLoop();
  draw(performance.now());
}

function startGame() {
  if (running) return;

  if (gameOverAt > 0) {
    initGame();
  }

  if (!started) started = true;

  primeAudio();
  gameOverAt = 0;
  running = true;
  setPlayingStatus();
  updatePlayLayoutState();
  updateActionButtons();
  runLoop();
}

function startFreshRun() {
  initGame();
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

  startGame();
}

function handleRestartButtonClick() {
  if (gadgetHelpOpen) return;
  startFreshRun();
}

function pauseGame() {
  if (!running) return;

  running = false;
  stopLoop();
  clearStatusTimer();
  statusEl.textContent = "המשחק מושהה";
  updatePlayLayoutState();
  updateActionButtons();
}

function togglePause() {
  if (gameOverAt > 0) return;

  if (!started) {
    startGame();
    return;
  }

  if (running) pauseGame();
  else startGame();
}

function runLoop() {
  stopLoop();
  currentSpeedMs = getCurrentSpeedMs();
  gameTimer = setInterval(tick, currentSpeedMs);
}

function stopLoop() {
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
  clearStatusTimer();
  stopLoop();
  playSound("fail");
  statusEl.textContent = pendingScoreEntry
    ? `${message}. אפשר לבחור ריצה חדשה או לתעד את השיא`
    : `${message}. אפשר לבחור ריצה חדשה או לחזור לתפריט`;
  triggerBoardFlash("danger");
  boardShakeUntil = performance.now() + 280;
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
    applyLevelDifficulty(level);
  }

  levelEl.textContent = String(level);
  stageBanner = {
    title: `שלב ${level}`,
    subtitle: "כמות האיומים עלתה",
    color: "rgba(120, 174, 255, 0.92)",
    start: performance.now(),
    duration: 1500
  };
  triggerBoardFlash("level");
  setTemporaryStatus(`שלב ${level}! כמות האיומים עלתה`, 1200);
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
  const weightedPool = [
    "shield",
    "shield",
    "blaster",
    "blaster",
    "slow"
  ];

  if (playerPowerState.blasterCharges === 0) weightedPool.push("blaster");
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
  switch (pickup.type) {
    case "shield":
      playerPowerState.shield += 1;
      setTemporaryStatus("מגן מוכן", 1100);
      addFloatingText("מגן", pickup.x, pickup.y, "#7de3ff");
      break;
    case "blaster":
      playerPowerState.blasterCharges += 2;
      setTemporaryStatus("2+ מטעני בלסטר", 1100);
      addFloatingText("בלסטר", pickup.x, pickup.y, "#cfa8ff");
      break;
    case "slow":
      playerPowerState.slowUntil = performance.now() + 7000;
      setTemporaryStatus("שדה האטה פעיל", 1100);
      addFloatingText("האטה", pickup.x, pickup.y, "#9ff3c8");
      break;
    default:
      break;
  }

  triggerBoardFlash("pickup");
  playSound("gadget");
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
  drawTargetCursor(nowMs);
  drawLaserShot(nowMs);
  drawExplosionBursts(nowMs);
  drawSnake(t);
  drawFoodBurst(nowMs);
  drawFloatingTexts(nowMs);
  drawStageBanner(nowMs);

  if (gameOverAt > 0) {
    drawGameOverOverlay(nowMs);
  } else if (!started) {
    drawStateOverlay("מוכן לשחק", "לחץ על התחל, החליק על הלוח או השתמש במקשי החצים");
  } else if (!running) {
    drawStateOverlay("המשחק מושהה", "לחץ על המשך או בחר כיוון כדי להמשיך");
  }

  ctx.restore();
}

function drawBackground(t) {
  const theme = getThemeConfig();
  const wobble = Math.sin(t * 1.35) * 18;
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
  const alpha = 0.22 + Math.sin(t * 2.2) * 0.06;
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
    const pulse = 1 + Math.sin(t * 5 + portal.phase) * 0.08;
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
  const pulse = 1 + Math.sin(t * 9) * 0.14;
  const cx = (food.x + 0.5) * CELL;
  const cy = (food.y + 0.5) * CELL;

  ctx.beginPath();
  ctx.fillStyle = theme.foodAura;
  ctx.arc(cx, cy, CELL * 0.46 * pulse, 0, Math.PI * 2);
  ctx.fill();

  const size = CELL - 8;
  const x = food.x * CELL + 4;
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
  const pulse = 1 + Math.sin(t * 6 + activePickup.phase) * 0.14;
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
    const glow = 0.24 + (Math.sin(t * 3.7 + obstacle.phase) + 1) * 0.13;
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
    const pulse = 1 + Math.sin(t * 7 + enemy.phase) * 0.1;

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
  const progress = (nowMs - laserShot.start) / 180;
  if (progress >= 1) {
    laserShot = null;
    return;
  }

  ctx.strokeStyle = `rgba(226, 178, 255, ${0.9 - progress * 0.85})`;
  ctx.lineWidth = 4 - progress * 2.5;
  ctx.beginPath();
  ctx.moveTo((laserShot.from.x + 0.5) * CELL, (laserShot.from.y + 0.5) * CELL);
  ctx.lineTo((laserShot.to.x + 0.5) * CELL, (laserShot.to.y + 0.5) * CELL);
  ctx.stroke();
}

function drawTargetCursor(nowMs) {
  if (!aimingShot || !targetCursor) return;

  const cx = (targetCursor.x + 0.5) * CELL;
  const cy = (targetCursor.y + 0.5) * CELL;
  const pulse = 1 + Math.sin(nowMs * 0.012) * 0.08;
  const radius = CELL * 0.42 * pulse;
  const color = targetCursor.kind === "enemy" ? "255, 148, 106" : "120, 214, 255";

  ctx.save();
  ctx.strokeStyle = `rgba(${color}, 0.95)`;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(${color}, 0.55)`;
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(cx - radius - 6, cy);
  ctx.lineTo(cx - radius + 4, cy);
  ctx.moveTo(cx + radius - 4, cy);
  ctx.lineTo(cx + radius + 6, cy);
  ctx.moveTo(cx, cy - radius - 6);
  ctx.lineTo(cx, cy - radius + 4);
  ctx.moveTo(cx, cy + radius - 4);
  ctx.lineTo(cx, cy + radius + 6);
  ctx.stroke();
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

  if (candidate.x === -direction.x && candidate.y === -direction.y) return;

  nextDirection = candidate;

  if (!started) {
    startGame();
    return;
  }

  if (!running && started && gameOverAt === 0) {
    startGame();
  }
}

function onKeyDown(event) {
  if (recordScorePanel && !recordScorePanel.hidden) {
    if (event.key === "Escape") {
      skipPendingScoreRecord();
    } else if (event.key === "Enter") {
      void submitPendingScoreRecord();
    }
    return;
  }

  if (gadgetHelpOpen && event.key !== "Escape" && event.key !== "Enter" && event.key !== " ") {
    return;
  }

  switch (event.key) {
    case "ArrowUp":
    case "w":
    case "W":
      setDirection("up");
      break;
    case "ArrowDown":
    case "s":
    case "S":
      setDirection("down");
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      setDirection("left");
      break;
    case "ArrowRight":
    case "d":
    case "D":
      setDirection("right");
      break;
    case " ":
      event.preventDefault();
      if (gadgetHelpOpen) {
        closeGadgetHelp();
        break;
      }
      togglePause();
      break;
    case "Enter":
      if (gadgetHelpOpen) {
        closeGadgetHelp();
        break;
      }
      if (!running && started) {
        initGame();
        startGame();
      }
      break;
    case "f":
    case "F":
      fireWeapon();
      break;
    case "Escape":
      if (gadgetHelpOpen) {
        closeGadgetHelp();
        break;
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
      break;
    default:
      return;
  }
}

function onCanvasPointerDown(event) {
  if (aimingShot) {
    swipeStart = null;
    event.preventDefault();
    return;
  }

  if (event.pointerType === "mouse") return;

  swipeStart = {
    x: event.clientX,
    y: event.clientY
  };

  if (canvas.setPointerCapture) {
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch (error) {
      // Ignore unsupported pointer capture scenarios.
    }
  }

  event.preventDefault();
}

function onCanvasPointerUp(event) {
  if (aimingShot) {
    const cell = getCellFromPointerEvent(event);
    const tappedTarget = getTargetAtCell(cell);
    if (tappedTarget) {
      targetCursor = tappedTarget;
    }
    fireWeapon();
    event.preventDefault();
    return;
  }

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

function getWeaponTargets() {
  return [
    ...enemies.map((enemy, index) => ({ kind: "enemy", x: enemy.x, y: enemy.y, index })),
    ...obstacles.map((obstacle, index) => ({ kind: "obstacle", x: obstacle.x, y: obstacle.y, index }))
  ];
}

function findNearestWeaponTarget(from = snake?.[0]) {
  if (!from) return null;
  const targets = getWeaponTargets();
  if (targets.length === 0) return null;

  let bestTarget = null;
  let bestDistance = Infinity;

  targets.forEach((target) => {
    const distance = Math.abs(target.x - from.x) + Math.abs(target.y - from.y);
    const enemyBias = target.kind === "enemy" ? -0.35 : 0;
    const weightedDistance = distance + enemyBias;
    if (weightedDistance < bestDistance) {
      bestDistance = weightedDistance;
      bestTarget = target;
    }
  });

  return bestTarget;
}

function setAimingShot(isActive, nextTarget = null) {
  aimingShot = isActive;
  targetCursor = isActive ? (nextTarget || findNearestWeaponTarget()) : null;

  if (aimingShot && targetCursor) {
    setTemporaryStatus(
      targetCursor.kind === "enemy"
        ? "כוונת נעולה על אויב. לחץ שוב או גע במטרה כדי לירות"
        : "כוונת נעולה על מכשול. לחץ שוב או גע במטרה כדי לפוצץ",
      900
    );
  } else if (!aimingShot && running) {
    setPlayingStatus();
  }
}

function getCellFromPointerEvent(event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(((event.clientX - rect.left) / rect.width) * GRID_SIZE);
  const y = Math.floor(((event.clientY - rect.top) / rect.height) * GRID_SIZE);

  if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return null;
  return { x, y };
}

function getTargetAtCell(cell) {
  if (!cell) return null;

  const enemyIndex = enemies.findIndex((enemy) => enemy.x === cell.x && enemy.y === cell.y);
  if (enemyIndex >= 0) {
    return { kind: "enemy", x: cell.x, y: cell.y, index: enemyIndex };
  }

  const obstacleIndex = obstacles.findIndex((obstacle) => obstacle.x === cell.x && obstacle.y === cell.y);
  if (obstacleIndex >= 0) {
    return { kind: "obstacle", x: cell.x, y: cell.y, index: obstacleIndex };
  }

  return null;
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
  activeTheme = normalizeKey(nextTheme, BACKGROUND_THEMES, activeTheme);
  localStorage.setItem(STORAGE_KEYS.theme, activeTheme);
  updateCustomizationUI();
}

function setSnakeSkin(nextSkin) {
  activeSkin = normalizeKey(nextSkin, SNAKE_SKINS, activeSkin);
  localStorage.setItem(STORAGE_KEYS.snakeSkin, activeSkin);
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

function updateMiniHud() {
  if (miniScoreEl) miniScoreEl.textContent = String(score ?? 0);
  if (miniLevelEl) miniLevelEl.textContent = String(level ?? 1);
  if (miniAbilityEl) miniAbilityEl.textContent = abilityLabelEl?.textContent || "אין בוסט";
}

function updateTouchControlsVisibility() {
  if (!touchControlsEl) return;
  if (!isTouchDevice) {
    touchControlsEl.hidden = false;
    return;
  }

  const shouldShow = started && gameOverAt === 0;
  touchControlsEl.hidden = !shouldShow;
}

function updatePlayLayoutState() {
  if (!appWrapEl) return;
  const overlayOpen =
    !menuPanel?.hidden || !leaderboardPanel?.hidden || !recordScorePanel?.hidden || gadgetHelpOpen;
  const isPlayFocused = started || gameOverAt > 0;
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
  if (playerNameInput) playerNameInput.value = playerName;
  if (profileNameInput) profileNameInput.value = playerName;
  if (recordPlayerNameInput) recordPlayerNameInput.value = playerName;
  if (themeSelect) themeSelect.value = activeTheme;
  if (snakeSkinSelect) snakeSkinSelect.value = activeSkin;
  if (soundToggle) soundToggle.checked = !audioMuted;
  if (gadgetTipsToggle) gadgetTipsToggle.checked = !gadgetTipsDisabled;

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
        ? "לוגו ברירת המחדל פעיל"
        : boardBackgroundSource.startsWith("data:")
        ? "תמונה מהמכשיר פעילה"
        : "תמונה מקישור פעילה";
    } else if (boardBackgroundError) {
      backgroundStatusEl.textContent = boardBackgroundError;
    } else {
      backgroundStatusEl.textContent = "רקע ברירת מחדל";
    }
  }
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
    running = true;
    setPlayingStatus();
    runLoop();
  } else if (!started) {
    statusEl.textContent = getIdleStatus();
  }

  gadgetHelpResumeAfterClose = false;
  updatePlayLayoutState();
  updateActionButtons();
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
  const hasWeaponTargets = getWeaponTargets().length > 0;
  const canFire = playerPowerState.blasterCharges > 0 && hasWeaponTargets && started && gameOverAt === 0 && !gadgetHelpOpen;
  const isIdle = !started && gameOverAt === 0;
  const isPaused = started && !running && gameOverAt === 0;
  const isGameOver = gameOverAt > 0;
  const hasRecordableScore = Boolean(pendingScoreEntry);

  if (aimingShot) {
    targetCursor = targetCursor ? getTargetAtCell(targetCursor) || findNearestWeaponTarget() : findNearestWeaponTarget();
    if (!canFire || !targetCursor) {
      aimingShot = false;
      targetCursor = null;
    }
  }

  startBtn.hidden = false;
  pauseBtn.hidden = false;
  restartBtn.hidden = false;

  if (isIdle) {
    startBtn.textContent = "התחל";
    startBtn.disabled = gadgetHelpOpen;
    pauseBtn.hidden = true;
    restartBtn.hidden = true;
  } else if (running) {
    startBtn.hidden = true;
    pauseBtn.textContent = "עצור";
    pauseBtn.disabled = gadgetHelpOpen;
    restartBtn.textContent = "ריצה חדשה";
    restartBtn.disabled = gadgetHelpOpen;
  } else if (isPaused) {
    startBtn.textContent = "המשך";
    startBtn.disabled = gadgetHelpOpen;
    pauseBtn.hidden = true;
    restartBtn.textContent = "ריצה חדשה";
    restartBtn.disabled = gadgetHelpOpen;
  } else if (isGameOver) {
    startBtn.textContent = hasRecordableScore ? "תעד שיא" : "לתפריט";
    startBtn.disabled = gadgetHelpOpen;
    pauseBtn.hidden = true;
    restartBtn.textContent = "ריצה חדשה";
    restartBtn.disabled = gadgetHelpOpen;
  }

  const visibleButtons = [startBtn, pauseBtn, restartBtn].filter((button) => !button.hidden).length;
  if (controlsEl) {
    controlsEl.dataset.hasAction = canFire ? "true" : "false";
    controlsEl.style.setProperty("--control-cols", String(Math.max(visibleButtons + (canFire ? 1 : 0), 1)));
  }

  fireBtn.disabled = !canFire;
  touchFireBtn.disabled = !canFire;
  if (miniFireBtn) miniFireBtn.disabled = !canFire;
  fireBtn.hidden = !canFire;
  touchFireBtn.hidden = false;
  if (miniFireBtn) miniFireBtn.hidden = false;

  if (canFire) {
    const actionText = aimingShot ? "שגר" : `כוון x${playerPowerState.blasterCharges}`;
    fireBtn.textContent = actionText;
    touchFireBtn.textContent = actionText;
    if (miniFireBtn) {
      miniFireBtn.textContent = aimingShot ? "◎" : "✦";
      miniFireBtn.setAttribute("aria-label", aimingShot ? "שגר בלסטר" : "הפעל כוונת בלסטר");
    }
  } else {
    touchFireBtn.textContent = "ירי";
    touchFireBtn.setAttribute("aria-label", "ירי לא זמין");
    if (miniFireBtn) {
      miniFireBtn.textContent = "✦";
      miniFireBtn.setAttribute("aria-label", "ירי לא זמין");
    }
  }

  if (miniPauseBtn) {
    miniPauseBtn.disabled = !started || gameOverAt > 0 || gadgetHelpOpen;
    miniPauseBtn.textContent = running ? "❚❚" : "▶";
    miniPauseBtn.setAttribute("aria-label", running ? "השהה משחק" : "המשך משחק");
  }
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
  if (playerPowerState.blasterCharges <= 0 || !started || gameOverAt > 0 || gadgetHelpOpen) return;

  const head = snake[0];
  const target = targetCursor || findNearestWeaponTarget(head);
  if (!target) return;

  if (!aimingShot) {
    setAimingShot(true, target);
    updateActionButtons();
    return;
  }

  playerPowerState.blasterCharges -= 1;
  laserShot = {
    from: { ...head },
    to: { x: target.x, y: target.y },
    start: performance.now()
  };
  activeExplosionBursts.push({
    x: target.x,
    y: target.y,
    start: performance.now(),
    duration: 320
  });

  let pointsEarned = 1;
  if (target.kind === "enemy") {
    enemies.splice(target.index, 1);
    pointsEarned = 2;
    addFloatingText("+2", target.x, target.y, "#d9b3ff");
  } else {
    obstacles.splice(target.index, 1);
    addFloatingText("פיצוץ", target.x, target.y, "#9fd8ff");
  }

  score += pointsEarned;
  scoreEl.textContent = String(score);
  if (score > bestScore) {
    bestScore = score;
    bestEl.textContent = String(bestScore);
    localStorage.setItem(STORAGE_KEYS.bestScore, String(bestScore));
  }

  triggerBoardFlash("weapon");
  playSound("weapon");
  setTemporaryStatus(target.kind === "enemy" ? "הבלסטר חיסל אויב" : "המכשול התפוצץ", 850);
  setAimingShot(false);
  updateHazardsLabel();
  updateAbilityLabel();
  updateActionButtons();
}

function formatPickupName(type) {
  switch (type) {
    case "shield":
      return "מגן";
    case "blaster":
      return "בלסטר";
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
  initGame();
  setMenuOpen(true);
  statusEl.textContent = "השיא נשמר. אפשר לבחור קושי ולהתחיל ריצה חדשה";
}

function skipPendingScoreRecord() {
  pendingScoreEntry = null;
  setRecordScoreOpen(false);
  initGame();
  setMenuOpen(true);
  statusEl.textContent = "חזרת לתפריט הראשי";
}

function setLeaderboardOpen(isOpen) {
  if (!leaderboardPanel) return;
  if (isOpen && menuPanel) {
    menuPanel.hidden = true;
  }
  if (isOpen && gadgetHelpPanel) {
    gadgetHelpPanel.hidden = true;
  }
  if (isOpen && recordScorePanel) {
    recordScorePanel.hidden = true;
  }
  leaderboardPanel.hidden = !isOpen;
  updatePlayLayoutState();
}

function setMenuOpen(isOpen) {
  if (!menuPanel) return;
  if (isOpen && leaderboardPanel) {
    leaderboardPanel.hidden = true;
  }
  if (isOpen && gadgetHelpPanel) {
    gadgetHelpPanel.hidden = true;
  }
  if (isOpen && recordScorePanel) {
    recordScorePanel.hidden = true;
  }
  menuPanel.hidden = !isOpen;
  updatePlayLayoutState();
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

function getBoardShakeOffset(nowMs) {
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
document.addEventListener("keydown", onKeyDown);
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

setTheme(activeTheme);
setSnakeSkin(activeSkin);
setControlLayout(preferredControlLayout);
setControlSize(preferredControlSize);
setControlSide(preferredControlSide);
setTouchSettingsOpen(false);
setMenuOpen(false);
setLeaderboardOpen(false);
loadBoardBackground(boardBackgroundSource);
initGame();
void loadCommunityLeaderboard();
syncViewportLayout();
