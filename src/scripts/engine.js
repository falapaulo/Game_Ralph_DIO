// Selecione os elementos relevantes
const squares = document.querySelectorAll('.square');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time-left');
const livesDisplay = document.querySelector('.menu-lives');

// Defina as variáveis do jogo
let score = 0;
let timeLeft = 60;
let lives = 3;
let hitPositions = [];
let currentTime;
let timerId;
let interval;
let speed = 1000;

// Função para selecionar aleatoriamente a posição do inimigo
function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('enemy');
  })

  hitPositions = [];
  let numberOfRalphs = Math.ceil(score / 10) + 1;
  for (let i = 0; i < numberOfRalphs; i++) {
    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('enemy');
    hitPositions.push(randomSquare.id);
  }
}

// Lógica para marcar pontos
squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (hitPositions.includes(square.id)) {
      score++;
      scoreDisplay.textContent = score;
      hitPositions = [];
    }
  })
})

// Lógica para movimentação do inimigo
function moveEnemy() {
  timerId = setInterval(randomSquare, speed);
}

// Lógica para iniciar o jogo
function startGame() {
  score = 0;
  lives = 3;
  timeLeft = 60;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  livesDisplay.textContent = 'x' + lives;
  moveEnemy();
  timerId = setInterval(countDown, 1000);
  currentTime = timeLeft;
  interval = setInterval(increaseSpeed, 10000); // Aumenta a velocidade a cada 10 segundos
}

// Lógica para aumentar a velocidade
function increaseSpeed() {
  speed -= 100;
  if (speed <= 100) {
    speed = 100;
  }
  clearInterval(timerId);
  moveEnemy();
}

// Lógica para diminuir o tempo restante
function countDown() {
  currentTime--;
  timeDisplay.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(timerId);
    clearInterval(interval);
    alert('Game Over! Your final score is ' + score);
  }
}

// Inicie o jogo
startGame();