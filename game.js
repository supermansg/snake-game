const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const levelEl = document.getElementById("level");
const hazardsEl = document.getElementById("hazards");
const statusEl = document.getElementById("status");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");
const difficultyButtons = document.querySelectorAll("[data-difficulty]");
const touchControlsEl = document.getElementById("touchControls");
const controlLayoutSelect = document.getElementById("controlLayoutSelect");
const controlSizeSelect = document.getElementById("controlSizeSelect");
const controlSideSelect = document.getElementById("controlSideSelect");
const touchButtons = document.querySelectorAll("[data-dir]");
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

const GRID_SIZE = 21;
const CELL = canvas.width / GRID_SIZE;
const SWIPE_MIN_DISTANCE = 24;
const DOUBLE_TAP_GUARD_MS = 280;

const STORAGE_KEYS = {
  bestScore: "snake_best",
  difficulty: "snake_difficulty",
  theme: "snake_theme",
  snakeSkin: "snake_skin",
  controlLayout: "snake_control_layout",
  controlSize: "snake_control_size",
  controlSide: "snake_control_side"
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
    foodAura: "rgba(247, 126, 115, 0.25)",
    foodCore: "#ff7e72",
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
    foodAura: "rgba(245, 177, 79, 0.2)",
    foodCore: "#f9b85a",
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
    eye: "#082a1e"
  },
  cobalt: {
    head: "#77b2ff",
    body: "#4c8fff",
    eye: "#0b1d3b"
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

  clearStatusTimer();
  updateDifficultyButtons();
  applyControlLayout();
  updateTouchControlSettingsUI();

  scoreEl.textContent = "0";
  levelEl.textContent = String(level);
  updateHazardsLabel();
  statusEl.textContent = getIdleStatus();

  pauseBtn.textContent = "Pause";
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
  pauseBtn.textContent = "Pause";
  runLoop();
}

function pauseGame() {
  if (!running) return;

  running = false;
  stopLoop();
  clearStatusTimer();
  statusEl.textContent = "Paused";
  pauseBtn.textContent = "Resume";
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
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  };
  const willEat = isFoodCell(newHead);

  if (isWallCollision(newHead)) {
    gameOver("Wall collision");
    return;
  }

  if (isSelfCollision(newHead, willEat)) {
    gameOver("You hit yourself");
    return;
  }

  if (isObstacleCollision(newHead)) {
    gameOver("Obstacle collision");
    return;
  }

  if (isEnemyCollision(newHead)) {
    gameOver("Enemy collision");
    return;
  }

  snake.unshift(newHead);

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

    food = createFood();
  } else {
    snake.pop();
  }

  moveEnemies();

  if (isEnemyTouchingSnake()) {
    gameOver("Enemy caught you");
    return;
  }

  updateLevel();
  updateHazardsLabel();
  updateSpeedIfNeeded();
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
  clearStatusTimer();
  stopLoop();
  statusEl.textContent = `${message}. Press Restart`;
  pauseBtn.textContent = "Pause";
}

function createFood() {
  for (let attempts = 0; attempts < 300; attempts += 1) {
    const candidate = {
      x: randomInt(0, GRID_SIZE - 1),
      y: randomInt(0, GRID_SIZE - 1)
    };

    if (!isBlockedCell(candidate)) return candidate;
  }

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const fallback = { x, y };
      if (!isBlockedCell(fallback)) return fallback;
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

function moveEnemies() {
  if (enemies.length === 0) return;

  const config = getDifficultyConfig();
  const head = snake[0];
  const moveInterval = Math.max(
    config.enemyMoveMinInterval,
    config.enemyMoveBaseInterval - Math.floor(level / 3)
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(t);
  drawGrid(t);
  drawObstacles(t);
  drawFood(t);
  drawEnemies(t);
  drawSnake(t);
  drawFoodBurst(nowMs);

  if (gameOverAt > 0) {
    drawGameOverOverlay(nowMs);
  }
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

  ctx.fillStyle = theme.foodCore;
  roundRect(food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6, 6);
  ctx.fill();
}

function drawSnake(t) {
  const skin = getSkinConfig();

  for (let i = 0; i < snake.length; i += 1) {
    const part = snake[i];
    const isHead = i === 0;
    const wave = Math.sin(t * 12 - i * 0.5) * 0.65;

    ctx.fillStyle = isHead ? skin.head : skin.body;
    roundRect(
      part.x * CELL + 1.9 + wave * 0.28,
      part.y * CELL + 1.9 + wave * 0.28,
      CELL - 3.8,
      CELL - 3.8,
      6
    );
    ctx.fill();
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

    ctx.fillStyle = `rgba(${theme.obstacleFillRGB}, ${glow})`;
    ctx.fillRect(x, y, size, size);
    ctx.strokeStyle = theme.obstacleStroke;
    ctx.lineWidth = 1.25;
    ctx.strokeRect(x + 0.7, y + 0.7, size - 1.4, size - 1.4);
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
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 30px Segoe UI";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
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
    if (!started || (!running && gameOverAt === 0)) {
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
}

function setControlSize(nextSize) {
  preferredControlSize = normalizeKey(nextSize, CONTROL_SIZE_PRESETS, preferredControlSize);
  localStorage.setItem(STORAGE_KEYS.controlSize, preferredControlSize);
  applyControlLayout();
  updateTouchControlSettingsUI();
}

function setControlSide(nextSide) {
  preferredControlSide = normalizeKey(nextSide, CONTROL_SIDE_PRESETS, preferredControlSide);
  localStorage.setItem(STORAGE_KEYS.controlSide, preferredControlSide);
  applyControlLayout();
  updateTouchControlSettingsUI();
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
document.addEventListener("keydown", onKeyDown);
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", togglePause);
restartBtn.addEventListener("click", initGame);

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
initGame();
