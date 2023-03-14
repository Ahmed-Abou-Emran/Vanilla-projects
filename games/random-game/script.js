'use strict';

const dice = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const player0 = document.querySelector('.player--0');
const player0Score = document.querySelector('#score--0');
const player0Current = document.querySelector('#current--0');

const player1 = document.querySelector('.player--1');
const player1Score = document.querySelector('#score--1');
const player1Current = document.querySelector('#current--1');

let currentPlayer = 0;

startGame();

function rollDice() {
  const random = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${random}.png`;
  dice.classList.remove('hidden');

  let currentActivePlayer = document.querySelector(
    `#current--${currentPlayer}`
  );

  let currentScore = Number(currentActivePlayer.textContent);
  currentScore += random;
  currentActivePlayer.textContent = currentScore;

  if (random === 1) {
    document.querySelector(`#current--${currentPlayer}`).textContent = 0;
    switchPlayer();
  }
}

function hold() {
  let currentScore = document.querySelector(`#current--${currentPlayer}`);
  let totalScore = document.querySelector(`#score--${currentPlayer}`);

  totalScore.textContent =
    Number(totalScore.textContent) + Number(currentScore.textContent);
  currentScore.textContent = 0;
  checkWinner();
  switchPlayer();
}

function switchPlayer() {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  currentPlayer = currentPlayer === 0 ? 1 : 0;
}

function startGame() {
  currentPlayer = 0;

  document.querySelector(`.player--active`).classList.remove('player--active');

  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');

  player0Score.textContent = 0;
  player0Current.textContent = 0;

  player1Score.textContent = 0;
  player1Current.textContent = 0;

  dice.classList.add('hidden');
}

function resetGame() {
  startGame();
}

function checkWinner() {
  let currentPlayerScore = document.querySelector(`#score--${currentPlayer}`);

  if (Number(currentPlayerScore.textContent) >= 100) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');

    dice.classList.add('hidden');

    btnHold.disabled = true;
    btnRoll.disabled = true;
  }
}

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', resetGame);
