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

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
    const movementType = movement > 0 ? 'withdrawal' : `deposit`;
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

const calculateTotalBalance = movements => {
  if (!Array.isArray(movements)) {
    throw new Error('Invalid input');
  }
  return movements.reduce((total, movement) => total + movement, 0);
};

const displayBalance = movements => {
  try {
    const balance = calculateTotalBalance(movements);
    labelBalance.textContent = `${balance}€`;
  } catch (error) {
    console.error(error);
  }
};

const displaySumary = (movements, interestRate) => {
  const ins = movements
    .filter(movement => movement > 0)
    .reduce((total, movement) => total + movement, 0);
  const outs = movements
    .filter(movement => movement < 0)
    .reduce((total, movement) => total + movement, 0);
  const interest = Math.floor(
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

  console.log(inputUser + inputPin);
  const user = accounts.find(account => {
    const isValid = account.username === inputUser && account.pin === inputPin;
    return isValid;
  });
  return user;
};

console.log(getUser());

const updateUI = account => {
  displayMovements(account.movements);
  displayBalance(account.movements);
  displaySumary(account.movements, account.interestRate);
};

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  const user = getUser();
  if (user) {
    labelWelcome.textContent = `Welcome back, ${user.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // clear currsor from inputPin field
    updateUI(user);
  }
  console.log(user);
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
