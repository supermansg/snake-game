const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const appWrapEl = document.querySelector(".wrap");
const topbarEl = document.querySelector(".topbar");
const hudEl = document.querySelector(".hud");
const controlsEl = document.querySelector(".controls");
const boardShellEl = document.getElementById("boardShell");

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
const recordsBtn = document.getElementById("recordsBtn");
const difficultyButtons = document.querySelectorAll("[data-difficulty]");
const touchControlsEl = document.getElementById("touchControls");
const touchSettingsToggle = document.getElementById("touchSettingsToggle");
const touchSettingsPanel = document.getElementById("touchSettingsPanel");
const touchFireBtn = document.getElementById("touchFireBtn");
const controlLayoutSelect = document.getElementById("controlLayoutSelect");
const controlSizeSelect = document.getElementById("controlSizeSelect");
const controlSideSelect = document.getElementById("controlSideSelect");
const leaderboardPanel = document.getElementById("leaderboardPanel");
const closeLeaderboardBtn = document.getElementById("closeLeaderboardBtn");
const playerNameInput = document.getElementById("playerNameInput");
const communityStatusEl = document.getElementById("communityStatus");
const localLeaderboardListEl = document.getElementById("localLeaderboardList");
const globalLeaderboardListEl = document.getElementById("globalLeaderboardList");
const personalBestSummaryEl = document.getElementById("personalBestSummary");
const communityModeBadgeEl = document.getElementById("communityModeBadge");
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
  personalRecords: "snake_personal_records"
};

const DIFFICULTY_PRESETS = {
  easy: {
    label: "Easy",
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
    enemyMoveMinInterval: 2
  },
  medium: {
    label: "Medium",
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
    enemyMoveMinInterval: 1
  },
  hard: {
    label: "Hard",
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
    enemyMoveMinInterval: 1
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
    obstacleFillRGB: "94, 120, 170",
    obstacleStroke: "#84a0d7",
    enemyAura: "rgba(255, 126, 85, 0.35)",
    enemyCore: "#ff8b61",
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
    obstacleFillRGB: "85, 133, 137",
    obstacleStroke: "#9bd6ca",
    enemyAura: "rgba(241, 108, 108, 0.34)",
    enemyCore: "#ff7268",
    burstRGB: "136, 244, 208",
    overlayRGB: "6, 20, 22"
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
let playerPowerState = {
  shield: 0,
  blasterCharges: 0,
  slowUntil: 0
};
let laserShot = null;
let personalRecords = loadPersonalRecords();
let communityRecords = [];
let communityStatus = {
  mode: COMMUNITY_LEADERBOARD_ENDPOINT ? "Connecting" : "Offline demo",
  detail: COMMUNITY_LEADERBOARD_ENDPOINT
    ? "Connecting to community board..."
    : "Community board: backend not connected yet"
};
let playerName = localStorage.getItem(STORAGE_KEYS.playerName) || "ArcadeHero";

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
  playerPowerState = {
    shield: 0,
    blasterCharges: 0,
    slowUntil: 0
  };
  laserShot = null;

  clearStatusTimer();
  updateDifficultyButtons();
  applyControlLayout();
  updateTouchControlSettingsUI();
  updateModeLabel();
  updateAbilityLabel();
  renderLeaderboards();
  syncViewportLayout();

  scoreEl.textContent = "0";
  levelEl.textContent = String(level);
  updateHazardsLabel();
  statusEl.textContent = getIdleStatus();

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

  gameOverAt = 0;
  running = true;
  setPlayingStatus();
  updateActionButtons();
  runLoop();
}

function pauseGame() {
  if (!running) return;

  running = false;
  stopLoop();
  clearStatusTimer();
  statusEl.textContent = "Paused";
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
    if (!tryUseShield("Shield absorbed the hit")) gameOver("Wall collision");
    return;
  }

  if (isSelfCollision(newHead, willEat)) {
    if (!tryUseShield("Shield saved the run")) gameOver("You hit yourself");
    return;
  }

  if (isObstacleCollision(newHead)) {
    if (!tryUseShield("Shield broke on impact")) gameOver("Obstacle collision");
    return;
  }

  if (isEnemyCollision(newHead)) {
    if (!tryUseShield("Shield repelled the enemy")) {
      gameOver("Enemy collision");
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
    addFloatingText("+1", newHead.x, newHead.y, "#ffd36d");

    food = createFood();
    maybeSpawnPickup();
  } else {
    snake.pop();
  }

  moveEnemies();

  if (isEnemyTouchingSnake()) {
    if (!tryUseShield("Shield repelled the enemy")) {
      gameOver("Enemy caught you");
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
  clearStatusTimer();
  stopLoop();
  statusEl.textContent = `${message}. Press New Run or Restart`;
  triggerBoardFlash("danger");
  boardShakeUntil = performance.now() + 280;
  saveRunToLeaderboards();
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
  addFloatingText("Warp", pos.x, pos.y, "#9cc7ff");
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
    title: `Level ${level}`,
    subtitle: "Hazards increased",
    color: "rgba(120, 174, 255, 0.92)",
    start: performance.now(),
    duration: 1500
  };
  triggerBoardFlash("level");
  setTemporaryStatus(`Level ${level}! Hazards increased`, 1200);
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
  if (score === 0 || score % 3 !== 0) return;

  const types = ["shield", "blaster", "slow"];
  const type = types[randomInt(0, types.length - 1)];
  const cell = findOpenCell();
  if (!cell) return;

  activePickup = {
    type,
    x: cell.x,
    y: cell.y,
    phase: Math.random() * Math.PI * 2
  };
  updateAbilityLabel();
}

function maybeSpawnPortals() {
  if (activePortals.length === 2) return;
  if (level < 2 || level % 2 !== 0) return;

  const first = findOpenCell();
  const second = findOpenCell(first);
  if (!first || !second) return;

  activePortals = [
    { id: "A", x: first.x, y: first.y, phase: Math.random() * Math.PI * 2, charges: 3 },
    { id: "B", x: second.x, y: second.y, phase: Math.random() * Math.PI * 2, charges: 3 }
  ];
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
      setTemporaryStatus("Shield ready", 1100);
      addFloatingText("Shield", pickup.x, pickup.y, "#7de3ff");
      break;
    case "blaster":
      playerPowerState.blasterCharges += 2;
      setTemporaryStatus("Blaster charges +2", 1100);
      addFloatingText("Blaster", pickup.x, pickup.y, "#cfa8ff");
      break;
    case "slow":
      playerPowerState.slowUntil = performance.now() + 7000;
      setTemporaryStatus("Slow field active", 1100);
      addFloatingText("Slow", pickup.x, pickup.y, "#9ff3c8");
      break;
    default:
      break;
  }

  triggerBoardFlash("pickup");
  updateAbilityLabel();
  updateActionButtons();
}

function tryUseShield(message) {
  if (playerPowerState.shield <= 0) return false;
  playerPowerState.shield -= 1;
  triggerBoardFlash("shield");
  addFloatingText("Shield", snake[0].x, snake[0].y, "#7de3ff");
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
  drawLaserShot(nowMs);
  drawSnake(t);
  drawFoodBurst(nowMs);
  drawFloatingTexts(nowMs);
  drawStageBanner(nowMs);

  if (gameOverAt > 0) {
    drawGameOverOverlay(nowMs);
  } else if (!started) {
    drawStateOverlay("Ready to Play", "Press Play, swipe, or hit an arrow key");
  } else if (!running) {
    drawStateOverlay("Paused", "Press Resume or tap a direction to keep going");
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

  const size = CELL - 7;
  const x = food.x * CELL + 3.5;
  const y = food.y * CELL + 3.5;
  const core = ctx.createLinearGradient(x, y, x + size, y + size);
  core.addColorStop(0, theme.foodHighlight);
  core.addColorStop(0.42, theme.foodCore);
  core.addColorStop(1, withAlpha(theme.foodCore, 0.78));
  ctx.fillStyle = core;
  roundRect(x, y, size, size, 7);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.24)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, y + 2.2);
  ctx.lineTo(cx, y + size - 2.2);
  ctx.moveTo(x + 2.2, cy);
  ctx.lineTo(x + size - 2.2, cy);
  ctx.stroke();
}

function drawPickup(t) {
  if (!activePickup) return;

  const cx = (activePickup.x + 0.5) * CELL;
  const cy = (activePickup.y + 0.5) * CELL;
  const pulse = 1 + Math.sin(t * 6 + activePickup.phase) * 0.14;

  const pickupStyles = {
    shield: { fill: "#78ddff", glow: "rgba(120, 221, 255, 0.22)", label: "S" },
    blaster: { fill: "#c58eff", glow: "rgba(197, 142, 255, 0.22)", label: "B" },
    slow: { fill: "#82ebb7", glow: "rgba(130, 235, 183, 0.22)", label: "T" }
  };

  const style = pickupStyles[activePickup.type];
  ctx.fillStyle = style.glow;
  ctx.beginPath();
  ctx.arc(cx, cy, CELL * 0.48 * pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = style.fill;
  roundRect(
    activePickup.x * CELL + 4,
    activePickup.y * CELL + 4,
    CELL - 8,
    CELL - 8,
    8
  );
  ctx.fill();

  ctx.fillStyle = "rgba(8, 16, 30, 0.86)";
  ctx.textAlign = "center";
  ctx.font = "bold 14px Segoe UI";
  ctx.fillText(style.label, cx, cy + 5);
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

    ctx.strokeStyle = isHead ? "rgba(232, 255, 246, 0.18)" : "rgba(209, 247, 231, 0.1)";
    ctx.lineWidth = 1;
    roundRect(x, y, size, size, 6);
    ctx.stroke();
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
    ctx.moveTo(0, -CELL * 0.42 * pulse);
    ctx.lineTo(CELL * 0.42 * pulse, 0);
    ctx.lineTo(0, CELL * 0.42 * pulse);
    ctx.lineTo(-CELL * 0.42 * pulse, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = theme.enemyCore;
    ctx.beginPath();
    ctx.arc(0, 0, CELL * 0.22, 0, Math.PI * 2);
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
  drawStateOverlay("Game Over", `${gameOverMessage} | Score ${score}`);
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
      togglePause();
      break;
    case "Enter":
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
      if (leaderboardPanel && !leaderboardPanel.hidden) {
        setLeaderboardOpen(false);
      }
      break;
    default:
      return;
  }
}

function onCanvasPointerDown(event) {
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
  statusEl.textContent = `Playing - ${config.label} - Level ${level}`;
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
  setTemporaryStatus(`Difficulty set to ${DIFFICULTY_PRESETS[difficulty].label}`, 1500);
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
}

function setSnakeSkin(nextSkin) {
  activeSkin = normalizeKey(nextSkin, SNAKE_SKINS, activeSkin);
  localStorage.setItem(STORAGE_KEYS.snakeSkin, activeSkin);
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
  if (!touchControlsEl) return;
  touchControlsEl.dataset.layout = CONTROL_LAYOUT_PRESETS[preferredControlLayout].layout;
  touchControlsEl.dataset.size = CONTROL_SIZE_PRESETS[preferredControlSize].size;
  touchControlsEl.dataset.side = CONTROL_SIDE_PRESETS[preferredControlSide].side;
}

function updateTouchControlSettingsUI() {
  if (controlLayoutSelect) controlLayoutSelect.value = preferredControlLayout;
  if (controlSizeSelect) controlSizeSelect.value = preferredControlSize;
  if (controlSideSelect) controlSideSelect.value = preferredControlSide;
}

function updateModeLabel() {
  if (!modeLabelEl) return;
  modeLabelEl.textContent = getDifficultyConfig().label;
}

function updateAbilityLabel() {
  if (!abilityLabelEl) return;

  if (playerPowerState.blasterCharges > 0) {
    abilityLabelEl.textContent = `Blaster x${playerPowerState.blasterCharges}`;
    return;
  }

  if (playerPowerState.shield > 0) {
    abilityLabelEl.textContent = `Shield x${playerPowerState.shield}`;
    return;
  }

  if (performance.now() < playerPowerState.slowUntil) {
    abilityLabelEl.textContent = "Slow field";
    return;
  }

  abilityLabelEl.textContent = activePickup ? `Pickup: ${formatPickupName(activePickup.type)}` : "No Boost";
}

function updateActionButtons() {
  startBtn.textContent = running ? "Playing" : gameOverAt > 0 ? "New Run" : started ? "Resume" : "Play";
  startBtn.disabled = running;

  pauseBtn.textContent = running ? "Pause" : started && gameOverAt === 0 ? "Resume" : "Pause";
  pauseBtn.disabled = !started || gameOverAt > 0;

  restartBtn.disabled = !started && gameOverAt === 0;

  const canFire = playerPowerState.blasterCharges > 0 && enemies.length > 0 && started && gameOverAt === 0;
  fireBtn.disabled = !canFire;
  touchFireBtn.disabled = !canFire;
}

function setTouchSettingsOpen(isOpen) {
  if (!touchSettingsToggle || !touchSettingsPanel) return;
  touchSettingsPanel.hidden = !isOpen;
  touchSettingsToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  touchSettingsToggle.setAttribute(
    "aria-label",
    isOpen ? "Close touch settings" : "Open touch settings"
  );
}

function toggleTouchSettings() {
  if (!touchSettingsPanel) return;
  setTouchSettingsOpen(touchSettingsPanel.hidden);
  requestAnimationFrame(syncViewportLayout);
}

function fireWeapon() {
  if (playerPowerState.blasterCharges <= 0 || enemies.length === 0) return;

  const head = snake[0];
  let bestTarget = null;
  let bestDistance = Infinity;

  enemies.forEach((enemy, index) => {
    const distance = Math.abs(enemy.x - head.x) + Math.abs(enemy.y - head.y);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestTarget = { enemy, index };
    }
  });

  if (!bestTarget) return;

  playerPowerState.blasterCharges -= 1;
  laserShot = {
    from: { ...head },
    to: { x: bestTarget.enemy.x, y: bestTarget.enemy.y },
    start: performance.now()
  };
  enemies.splice(bestTarget.index, 1);
  score += 2;
  scoreEl.textContent = String(score);
  updateHazardsLabel();
  updateAbilityLabel();
  updateActionButtons();
  triggerBoardFlash("weapon");
  addFloatingText("+2", bestTarget.enemy.x, bestTarget.enemy.y, "#d9b3ff");
  setTemporaryStatus("Blaster fired", 700);
}

function formatPickupName(type) {
  switch (type) {
    case "shield":
      return "Shield";
    case "blaster":
      return "Blaster";
    case "slow":
      return "Slow";
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
    ? "Tap Start, swipe board, or use the pad"
    : "Press Start or Arrow Keys";
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

function saveRunToLeaderboards() {
  if (score <= 0) return;

  const entry = {
    player: sanitizePlayerName(playerName),
    score,
    level,
    difficulty: getDifficultyConfig().label,
    recordedAt: new Date().toISOString()
  };

  personalRecords = [entry, ...personalRecords]
    .sort((a, b) => b.score - a.score || b.level - a.level)
    .slice(0, MAX_PERSONAL_RECORDS);
  localStorage.setItem(STORAGE_KEYS.personalRecords, JSON.stringify(personalRecords));
  renderLeaderboards();
  void submitCommunityScore(entry);
}

function renderLeaderboards() {
  if (playerNameInput) playerNameInput.value = playerName;
  renderLeaderboardList(localLeaderboardListEl, personalRecords, true);
  renderLeaderboardList(globalLeaderboardListEl, communityRecords, false);

  const personalBest = personalRecords[0]?.score || 0;
  if (personalBestSummaryEl) {
    personalBestSummaryEl.textContent = `${personalBest} pts`;
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
    target.innerHTML = "<li><span>No scores yet</span><span>Play a run</span></li>";
    return;
  }

  target.innerHTML = entries
    .slice(0, includeMeta ? MAX_PERSONAL_RECORDS : MAX_COMMUNITY_RECORDS)
    .map((entry) => {
      const rightLabel = includeMeta
        ? `Lv ${entry.level} | ${entry.difficulty}`
        : `${entry.score} pts`;
      const leftLabel = includeMeta
        ? `${entry.score} pts`
        : `${entry.player}`;
      const primary = includeMeta ? entry.player : leftLabel;
      return `<li><span>${escapeHtml(primary)}</span><span>${escapeHtml(includeMeta ? leftLabel + " | " + rightLabel : rightLabel)}</span></li>`;
    })
    .join("");
}

async function loadCommunityLeaderboard() {
  if (!COMMUNITY_LEADERBOARD_ENDPOINT) {
    communityRecords = getDemoCommunityRecords();
    communityStatus = {
      mode: "Offline demo",
      detail: "Community board: connect a backend endpoint to enable real shared scores"
    };
    renderLeaderboards();
    return;
  }

  communityStatus = {
    mode: "Online",
    detail: "Loading community board..."
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
    communityRecords = Array.isArray(payload) ? payload.slice(0, MAX_COMMUNITY_RECORDS) : getDemoCommunityRecords();
    communityStatus = {
      mode: "Live",
      detail: "Community board connected"
    };
  } catch {
    communityRecords = getDemoCommunityRecords();
    communityStatus = {
      mode: "Offline demo",
      detail: "Community board fallback: backend unavailable"
    };
  }

  renderLeaderboards();
}

async function submitCommunityScore(entry) {
  if (!COMMUNITY_LEADERBOARD_ENDPOINT) return;

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
      mode: "Offline demo",
      detail: "Community submit failed: showing fallback board"
    };
    renderLeaderboards();
  }
}

function getDemoCommunityRecords() {
  return [
    { player: "ByteRunner", score: 92, level: 14, difficulty: "Hard" },
    { player: "GridFox", score: 71, level: 11, difficulty: "Medium" },
    { player: "LaserEel", score: 58, level: 9, difficulty: "Hard" },
    { player: "NovaTail", score: 43, level: 8, difficulty: "Medium" },
    { player: "ArcPilot", score: 30, level: 6, difficulty: "Easy" }
  ];
}

function sanitizePlayerName(value) {
  const trimmed = (value || "").trim().slice(0, 14);
  return trimmed || "ArcadeHero";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function setLeaderboardOpen(isOpen) {
  if (!leaderboardPanel) return;
  leaderboardPanel.hidden = !isOpen;
  requestAnimationFrame(syncViewportLayout);
}

function syncViewportLayout() {
  document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);

  if (!isTouchDevice || !appWrapEl || !boardShellEl) return;

  const bodyStyle = window.getComputedStyle(document.body);
  const bodyTop = parseFloat(bodyStyle.paddingTop) || 0;
  const bodyBottom = parseFloat(bodyStyle.paddingBottom) || 0;
  const wrapStyle = window.getComputedStyle(appWrapEl);
  const wrapPaddingTop = parseFloat(wrapStyle.paddingTop) || 0;
  const wrapPaddingBottom = parseFloat(wrapStyle.paddingBottom) || 0;
  const rowGap = parseFloat(wrapStyle.rowGap || wrapStyle.gap) || 0;

  const visibleSections = [topbarEl, hudEl, controlsEl, touchControlsEl].filter(
    (el) => el && window.getComputedStyle(el).display !== "none"
  );
  const sectionsHeight = visibleSections.reduce((sum, el) => sum + el.offsetHeight, 0);
  const gapsHeight = Math.max(0, visibleSections.length - 1) * rowGap;
  const chrome = bodyTop + bodyBottom + wrapPaddingTop + wrapPaddingBottom + sectionsHeight + gapsHeight + 18;
  const available = Math.max(180, window.innerHeight - chrome);
  const size = Math.min(420, available);

  document.documentElement.style.setProperty("--mobile-board-size", `${Math.floor(size)}px`);
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
document.addEventListener("keydown", onKeyDown);
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", togglePause);
restartBtn.addEventListener("click", initGame);
fireBtn.addEventListener("click", fireWeapon);
recordsBtn.addEventListener("click", () => setLeaderboardOpen(true));
touchFireBtn.addEventListener("click", fireWeapon);

difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => setDifficulty(button.dataset.difficulty));
});

if (controlLayoutSelect) {
  controlLayoutSelect.addEventListener("change", () => setControlLayout(controlLayoutSelect.value));
}

if (controlSizeSelect) {
  controlSizeSelect.addEventListener("change", () => setControlSize(controlSizeSelect.value));
}

if (controlSideSelect) {
  controlSideSelect.addEventListener("change", () => setControlSide(controlSideSelect.value));
}

if (touchSettingsToggle) {
  touchSettingsToggle.addEventListener("click", toggleTouchSettings);
}

if (closeLeaderboardBtn) {
  closeLeaderboardBtn.addEventListener("click", () => setLeaderboardOpen(false));
}

if (leaderboardPanel) {
  leaderboardPanel.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.hasAttribute("data-close-overlay")) {
      setLeaderboardOpen(false);
    }
  });
}

if (playerNameInput) {
  playerNameInput.value = playerName;
  playerNameInput.addEventListener("change", () => {
    playerName = sanitizePlayerName(playerNameInput.value);
    playerNameInput.value = playerName;
    localStorage.setItem(STORAGE_KEYS.playerName, playerName);
    renderLeaderboards();
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
setLeaderboardOpen(false);
initGame();
void loadCommunityLeaderboard();
syncViewportLayout();
