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
const touchButtons = document.querySelectorAll("[data-dir]");

const GRID_SIZE = 21;
const CELL = canvas.width / GRID_SIZE;
const BASE_SPEED_MS = 148;
const MIN_SPEED_MS = 64;
const SCORE_PER_LEVEL = 4;
const BASE_OBSTACLES = 2;
const MAX_ENEMIES = 5;
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
let bestScore = Number(localStorage.getItem("snake_best") || 0);
let currentSpeedMs = BASE_SPEED_MS;
let gameTimer = null;
let rafId = null;
let running = false;
let started = false;
let gameOverAt = 0;
let statusTimeout = null;
let foodBurst = null;

bestEl.textContent = String(bestScore);

function initGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];
  obstacles = [];
  enemies = [];
  for (let i = 0; i < BASE_OBSTACLES; i += 1) {
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
  scoreEl.textContent = "0";
  levelEl.textContent = String(level);
  hazardsEl.textContent = String(obstacles.length + enemies.length);
  statusEl.textContent = "Press Start or Arrow Keys";
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
  if (gameTimer) {
    clearInterval(gameTimer);
    gameTimer = null;
  }
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
      localStorage.setItem("snake_best", String(bestScore));
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

    const nearHead =
      Math.abs(candidate.x - head.x) + Math.abs(candidate.y - head.y) < 4;

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

    const nearHead =
      Math.abs(candidate.x - head.x) + Math.abs(candidate.y - head.y) < 7;

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

  const head = snake[0];
  const moveInterval = Math.max(1, 4 - Math.floor(level / 2));

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

  // Occasional jitter makes enemy movement less predictable.
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
  const nextLevel = 1 + Math.floor(score / SCORE_PER_LEVEL);
  if (nextLevel <= level) return;

  while (level < nextLevel) {
    level += 1;
    applyLevelDifficulty(level);
  }

  levelEl.textContent = String(level);
  setTemporaryStatus(`Level ${level}! Hazards increased`, 1200);
}

function applyLevelDifficulty(currentLevel) {
  const obstacleCount = currentLevel % 3 === 0 ? 2 : 1;
  for (let i = 0; i < obstacleCount; i += 1) {
    spawnObstacle();
  }

  if (currentLevel % 2 === 0 && enemies.length < MAX_ENEMIES) {
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
  const scoreBoost = Math.floor(score / 2) * 4;
  const levelBoost = (level - 1) * 3;
  return Math.max(MIN_SPEED_MS, BASE_SPEED_MS - scoreBoost - levelBoost);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  const wobble = Math.sin(t * 1.3) * 18;
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height + wobble);
  grad.addColorStop(0, "#151d2b");
  grad.addColorStop(0.5, "#111826");
  grad.addColorStop(1, "#0d121c");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid(t) {
  ctx.strokeStyle = `rgba(54, 80, 120, ${0.24 + Math.sin(t * 2.2) * 0.05})`;
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
  const pulse = 1 + Math.sin(t * 9) * 0.14;
  const cx = (food.x + 0.5) * CELL;
  const cy = (food.y + 0.5) * CELL;

  ctx.beginPath();
  ctx.fillStyle = "rgba(242, 95, 92, 0.22)";
  ctx.arc(cx, cy, CELL * 0.46 * pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ff736f";
  roundRect(
    food.x * CELL + 3,
    food.y * CELL + 3,
    CELL - 6,
    CELL - 6,
    6
  );
  ctx.fill();
}

function drawSnake(t) {
  for (let i = 0; i < snake.length; i += 1) {
    const part = snake[i];
    const isHead = i === 0;
    const wave = Math.sin(t * 12 - i * 0.5) * 0.65;

    ctx.fillStyle = isHead ? "#53e0a3" : "#2fc486";
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
  const head = snake[0];
  const centerX = (head.x + 0.5) * CELL;
  const centerY = (head.y + 0.5) * CELL;
  const perpendicular = { x: -direction.y, y: direction.x };

  const eyeForward = 3;
  const eyeSpread = 2.4;
  const eyeRadius = 1.3;

  ctx.fillStyle = "#082a1e";
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
  for (let i = 0; i < obstacles.length; i += 1) {
    const obstacle = obstacles[i];
    const glow = 0.25 + (Math.sin(t * 3.7 + obstacle.phase) + 1) * 0.12;
    const x = obstacle.x * CELL + 2;
    const y = obstacle.y * CELL + 2;
    const size = CELL - 4;

    ctx.fillStyle = `rgba(88, 110, 152, ${glow})`;
    ctx.fillRect(x, y, size, size);
    ctx.strokeStyle = "#6d84b2";
    ctx.lineWidth = 1.25;
    ctx.strokeRect(x + 0.7, y + 0.7, size - 1.4, size - 1.4);
  }
}

function drawEnemies(t) {
  for (let i = 0; i < enemies.length; i += 1) {
    const enemy = enemies[i];
    const cx = (enemy.x + 0.5) * CELL;
    const cy = (enemy.y + 0.5) * CELL;
    const pulse = 1 + Math.sin(t * 7 + enemy.phase) * 0.1;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 2.3 + enemy.phase);
    ctx.fillStyle = "rgba(255, 112, 79, 0.35)";
    ctx.beginPath();
    ctx.moveTo(0, -CELL * 0.42 * pulse);
    ctx.lineTo(CELL * 0.42 * pulse, 0);
    ctx.lineTo(0, CELL * 0.42 * pulse);
    ctx.lineTo(-CELL * 0.42 * pulse, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#ff7d52";
    ctx.beginPath();
    ctx.arc(0, 0, CELL * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawFoodBurst(nowMs) {
  if (!foodBurst) return;
  const progress = (nowMs - foodBurst.start) / 380;
  if (progress >= 1) {
    foodBurst = null;
    return;
  }

  const cx = (foodBurst.x + 0.5) * CELL;
  const cy = (foodBurst.y + 0.5) * CELL;

  ctx.strokeStyle = `rgba(255, 188, 98, ${0.5 - progress * 0.45})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, CELL * (0.35 + progress * 0.7), 0, Math.PI * 2);
  ctx.stroke();
}

function drawGameOverOverlay(nowMs) {
  const alpha = Math.min(0.68, ((nowMs - gameOverAt) / 280) * 0.68);
  ctx.fillStyle = `rgba(8, 11, 20, ${alpha})`;
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

function setPlayingStatus() {
  statusEl.textContent = `Playing - Level ${level}`;
}

function setTemporaryStatus(message, durationMs) {
  clearStatusTimer();
  statusEl.textContent = message;
  statusTimeout = setTimeout(() => {
    statusTimeout = null;
    if (running) setPlayingStatus();
  }, durationMs);
}

function clearStatusTimer() {
  if (statusTimeout) {
    clearTimeout(statusTimeout);
    statusTimeout = null;
  }
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

function startRenderLoop() {
  if (rafId) return;

  const render = (time) => {
    draw(time);
    rafId = requestAnimationFrame(render);
  };

  rafId = requestAnimationFrame(render);
}

document.addEventListener("keydown", onKeyDown);
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", togglePause);
restartBtn.addEventListener("click", initGame);
touchButtons.forEach((btn) => {
  btn.addEventListener("click", () => setDirection(btn.dataset.dir));
});

initGame();
