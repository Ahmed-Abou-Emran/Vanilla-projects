'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
const min = -10000;
const max = 10000;
const numCount = 10000;
const numbers = [];

for (let i = 0; i < numCount; i++) {
  const num = Math.floor(Math.random() * (max - min + 1) + min);
  numbers.push(num);
}

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];


// Elements

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// v1 - using Fragments

const displayMovements = movements => {
  containerMovements.innerHTML = '';
  const fragment = document.createDocumentFragment();
  movements.forEach((movement, i) => {
    const movementType = movement > 0 ? 'deposit' : `withdrawal`;
    const date = new Date().toLocaleDateString('en-US');

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${movementType}">${i} ${movementType}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${movement}€</div>
    </div>`;
    const div = document.createElement('div');
    div.insertAdjacentHTML('afterbegin', html);
    fragment.appendChild(div);
  });
  containerMovements.appendChild(fragment);
};

const calculateTotalBalance = account => {
  if (!Array.isArray(movements)) {
    throw new Error('Invalid input');
  }
  const balance = account.movements.reduce(
    (total, movement) => total + movement,
    0
  );
  currentAccount.balance = balance;
  return balance;
};

const displayBalance = account => {
  try {
    calculateTotalBalance(account);
    labelBalance.textContent = `${account.balance}€`;
  } catch (error) {
    console.error(error);
  }
};

const displaySumary = (movements, interestRate) => {
  const ins = Math.round(movements
    .filter(movement => movement > 0)
    .reduce((total, movement) => total + movement, 0));
  const outs = Math.round(movements
    .filter(movement => movement < 0)
    .reduce((total, movement) => total + movement, 0));

  const interest = Math.round(
    movements
      .map(movement => (movement * interestRate) / 100)
      .filter(interest => interest > 1)
      .reduce((total, interest) => total + interest, 0)
  );

  labelSumIn.textContent = `${ins}€`;
  labelSumOut.textContent = `${Math.abs(outs)}€`;
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernmaes = accounts => {
  accounts
    .map(account =>
      account.owner
        .split(' ')
        .map(name => name[0])
        .join('')
        .toLowerCase()
    )
    .forEach((username, i) => (accounts[i].username = username));

  console.log(accounts);
};

createUsernmaes(accounts);

const getUser = () => {
  const inputUser = inputLoginUsername.value;
  const inputPin = Number(inputLoginPin.value);

  const user = accounts.find(account => {
    const isValid = account.username === inputUser && account.pin === inputPin;
    return isValid;
  });

  return user;
};

const updateUI = currentAccount => {
  displayMovements(currentAccount.movements);
  displayBalance(currentAccount);
  displaySumary(currentAccount.movements, currentAccount.interestRate);
};

let currentAccount = null;
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = getUser();
  updateUI(currentAccount);
  if (currentAccount) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // clear currsor from inputPin field
  }
});

let receiverAccount = null;

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  receiverAccount = accounts.find(
    account => account.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount?.username
  ) {
    console.log('Transfer valid');
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  } else {
    console.log('Transfer invalid');
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(movement => movement >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  const inputUser = inputCloseUsername.value;
  const inputPin = Number(inputClosePin.value);
  const isCurrentUser =
    inputUser === currentAccount.username && inputPin === currentAccount.pin;

  if (isCurrentUser) {
    const index = accounts.findIndex(
      account => account.username === currentAccount.username
    );
    accounts.splice(index, 1);
  }
  labelWelcome.textContent = `Log in to get started`;
  inputCloseUsername.value = inputClosePin.value = '';
  containerApp.style.opacity = 0;
});

let isSorted = false;

btnSort.addEventListener('click', e => {
  const sortedMovements = currentAccount.movements
    .slice()
    .sort((a, b) => a - b);
  e.preventDefault();
  displayMovements(isSorted ? currentAccount.movements : sortedMovements);
  isSorted = !isSorted;
});

// v2 for displayMovements - using insertAdjacentHTML in each iteration
// const displayMovements = movements => {
//   containerMovements.innerHTML = '';
//   movements.forEach((movement, i) => {
//     const movementType = movement > 0 ? 'withdrawal' : `deposit`;
//     const date = new Date().toLocaleDateString('en-US');

//     const html = `
//     <div class="movements__row">
//           <div class="movements__type movements__type--${movementType}">${i} ${movementType}</div>
//           <div class="movements__date">3 days ago</div>
//           <div class="movements__value">${movement}€</div>
//     </div>`;
//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
// };

// displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Measure performance of displayMovements function
const startTime = performance.now();

displayMovements(account1.movements);

const endTime = performance.now();
const elapsedTime = endTime - startTime;
console.log(`Elapsed time: ${elapsedTime} ms`);
