'use strict';

const highscoreElement = document.querySelector('.highscore');
const scoreElement = document.querySelector('.score');
const numberElement = document.querySelector('.number');
const messageElement = document.querySelector('.message');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

checkBtn.addEventListener('click', checkHandler);
againBtn.addEventListener('click', againHandler);

function againHandler() {
  score = 20;
  scoreElement.textContent = score;
  messageElement.textContent = 'Start guessing...';
  numberElement.textContent = '?';
  document.querySelector('body').style.backgroundColor = '#19A7CE';
  numberElement.style.width = '15rem';
  document.querySelector('.guess').value = '';
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
      messageElement.textContent =
        guess > secretNumber ? 'Too high!' : 'Too low!';
      score--;
      scoreElement.textContent = score;
    } else {
      messageElement.textContent = 'You lost the game!';
      document.querySelector('body').style.backgroundColor = '#b34747';
      scoreElement.textContent = 0;
    }
  }
}
