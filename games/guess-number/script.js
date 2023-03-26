'use strict';

const highscoreElement = document.querySelector('.highscore');
const scoreElement = document.querySelector('.score');
const numberElement = document.querySelector('.number');
const messageElement = document.querySelector('.message');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const betweenElement = document.querySelector('.between');
const difficultyInputElement = document.querySelector('.difficulty');
let difficulty = document.querySelector('.difficulty').value;

// Set the range of numbers and number of attempts based on the difficulty level
let score, range, highscore, secretNumber;

gameStart();

function gameStart() {
  [score, range] = getScoreAndRange();
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  highscore = 0;
  scoreElement.textContent = score;
  highscoreElement.textContent = highscore;
  betweenElement.textContent = `Between 1 and ${range}`;

  checkBtn.addEventListener('click', checkHandler);
  againBtn.addEventListener('click', againHandler);
  difficultyInputElement.addEventListener('change', difficultyHandler);
}

function difficultyHandler() {
  [score, range] = getScoreAndRange();

  scoreElement.textContent = score;
  secretNumber = Math.trunc(Math.random() * range) + 1;
  betweenElement.textContent = `Between 1 and ${range}`;
  againHandler();
}

function getScoreAndRange() {
  difficulty = document.querySelector('.difficulty').value;
  if (difficulty === 'easy') {
    range = 20;
    score = 10;
  } else if (difficulty === 'medium') {
    range = 50;
    score = 8;
  } else if (difficulty === 'hard') {
    range = 100;
    score = 5;
  }

  return [score, range];
}

function againHandler() {
  resetGame();
}

function checkHandler() {
  let guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    messageElement.textContent = 'No number!';
  } else if (guess === secretNumber) {
    messageElement.textContent = 'Correct number!';
    numberElement.textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    numberElement.style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      highscoreElement.textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      console.log(secretNumber);
      messageElement.textContent =
        guess > secretNumber ? 'Too high!' : 'Too low!';
      score--;
      scoreElement.textContent = score;
    } else {
      console.log(score, highscore);
      messageElement.textContent = 'You lost the game!';
      document.querySelector('body').style.backgroundColor = '#b34747';
      scoreElement.textContent = 0;

      difficultyInputElement.disabled = true;
      checkBtn.disabled = true;
    }
  }
}

function resetGame() {
  [score, range] = getScoreAndRange();
  scoreElement.textContent = score;
  betweenElement.textContent = `Between 1 and ${range}`;

  messageElement.textContent = 'Start guessing...';
  numberElement.textContent = '?';
  document.querySelector('body').style.backgroundColor = '#19A7CE';
  numberElement.style.width = '15rem';
  document.querySelector('.guess').value = '';
  difficultyInputElement.disabled = false;
  checkBtn.disabled = false;
}
