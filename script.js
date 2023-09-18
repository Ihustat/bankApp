'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

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

//clear input

function clearInput(input) {
  input.value = '';
};

//dispalyTransactions

function displayTransactions(transactions) {
  containerTransactions.innerHTML = '';
  
  transactions.forEach((transaction, i) => {
      const transType = transaction > 0 ? 'deposit' : 'withdrawal';

      const transactionRaw = `
      <div class="transactions__row">
      <div class="transactions__type transactions__type--${transType}">
        ${i + 1}. ${transType}
      </div>
      <div class="transactions__value">${transaction}$</div>
    </div>
      `;

      containerTransactions.insertAdjacentHTML('afterbegin', transactionRaw);
  });
};


//create Nicknames

function createNicknames(accs) {
    accs.forEach(acc => {
        acc.nickname = acc.userName
        .toLowerCase()
        .split(' ')
        .map(word => word[0])
        .join('');
    });
};

createNicknames(accounts);

//show total balance

function showBalance(account) {
  account.balance = account.transactions.reduce((accum, transaction) => accum + transaction);

  labelBalance.textContent = `${account.balance}$`
};

//display total

function displayTotal(transaction) {
  labelSumIn.textContent = `${transaction.filter(trans => trans > 0).reduce((accum, trans) => accum + trans)}$`;

  labelSumOut.textContent = `${transaction.filter(trans => trans < 0).reduce((accum, trans) => accum + trans)}$`;

};

//updateUi

function updateUI(account) {
  displayTransactions(account.transactions);

  showBalance(account);

  displayTotal(account.transactions);
};

//logIn

let currentAccount

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();

 currentAccount = accounts.find(account => account.nickname === inputLoginUsername.value);

 if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Добро пожаловать, ${currentAccount.userName}`;

    containerApp.style.opacity = '1';

    updateUI(currentAccount);

    clearInput(inputLoginPin);
    clearInput(inputLoginUsername);

 };

});

//tranfer function

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();

  const transferAmount = +inputTransferAmount.value;

  const recipentAcc = accounts.find(account => account.nickname === inputTransferTo.value);

  clearInput(inputTransferAmount);
  clearInput(inputTransferTo);

  if (transferAmount > 0 && 
    transferAmount <= currentAccount.balance && 
    recipentAcc?.nickname !== currentAccount.nickname && 
    recipentAcc) {

    currentAccount.transactions.push(-transferAmount);
    recipentAcc.transactions.push(transferAmount);

    updateUI(currentAccount);

  };
});

//close account function

btnClose.addEventListener('close', (e) => {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.nickname &&
     +inputClosePin.value === currentAccount.pin) {
      const currentIndex = accounts.findIndex(account => account.nickname === currentAccount.nickname);

      accounts.splice(currentIndex, 1);

      containerApp.style.opacity = 0;

      labelWelcome.textContent = 'Войдите в свой аккаунт';

      clearInput(inputCloseUsername);
      clearInput(inputClosePin);
  }
});

//loan function

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();

  const loanAmount = +inputLoanAmount.value;

  if (loanAmount > 0 &&
    currentAccount.transactions.some(trans => trans >= loanAmount * 0.1)) {
        currentAccount.transactions.push(loanAmount);

        updateUI(currentAccount);

        clearInput(inputLoanAmount);
    };
});

