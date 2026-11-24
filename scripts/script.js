//IDEAS IF TIME PERMITS
//Full on money/betting system. Buy in, bet amounts, etc
//chip animation with canvas?

class Player {
  constructor(buyIn) {
    this.hand = [];
  }

  hit(who) {
    console.log(who, "hits");
  }

  stand(who) {
    console.log(who, "stands");
  }

  stand(who) {
    console.log(who, "doubles down");
  }

  stand(who) {
    console.log(who, "splits");
  }
}

const player1 = new Player();

//create new deck
const cardNumber = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const cardSuit = ["Hearts", "Clubs", "Diamonds", "Spades"];

const deck = [];
createNewDeck();

//Creates a deack of 52 unique cards. pushes them into the deck array
function createNewDeck() {
  for (let i = 0; i < cardNumber.length; i++) {
    for (let l = 0; l < cardSuit.length; l++) {
      deck.push([cardNumber[i], cardSuit[l]]);
    }
  }

  console.log(deck);
}

//Draw card

//double check to see if this is random, and not weighted
function getRandomCard(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const dealerDeck = [];
const playerDeck = [];

//draw card function

//my initial
// function drawCard(hand) {
//     const cardsLeft = deck.length;
//     let cardDrawn = deck.splice(getRandomCard(0, cardsLeft), 1);
//     playerDeck.push(cardDrawn);
// }

//me tweaking my initial:
function drawCard(hand) {
  const cardsLeft = deck.length - 1;
  const [cardDrawn] = deck.splice(getRandomCard(0, cardsLeft), 1);
  hand.push(cardDrawn);
}

//claudes idea
// function drawCard(hand) {
//   const index = getRandomCard(0, deck.length - 1); // was deck.length, which can go 1 past the end
//   const [card] = deck.splice(index, 1);            // splice returns an array, so unwrap it
//   hand.push(card);
// }

//Convert hand array to card value

function getCardValue(card) {
  const cardValue = card[0];
  if (cardValue === "A") {
    return 11;
  } else if (cardValue === "J" || cardValue === "Q" || cardValue === "K") {
    return 10;
  } else return cardValue;
}

//used claude to help me adjust for aces when above 21
function getHandValue(hand) {
  let total = 0;
  let aces = 0;

  for (let i = 0; i < hand.length; i++) {
    total += getCardValue(hand[i]);
    if (hand[i][0] === "A") aces++;
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

// display

const playerTotalDisplay = document.getElementById("your-total");
const dealerTotalDisplay = document.getElementById("dealer-total");
// playerTotalDisplay.textContent = "10"

// buttons
const gameplayButtons = document.querySelectorAll(".gameplay-button");
const startButton = document.getElementById("start-button");

// fix the blackjack win condition, currenttly doesnt  work because winCondition is not called on cards dealt
const winCondition = function () {
  if (getHandValue(playerDeck) > 21) {
    console.log("You Busted! Dealer Wins!");
    gameplayButtons.forEach((button) => (button.disabled = true));
    moneyTotal -= betSize;
    moneyTotalDisplay.textContent = moneyTotal;
  } else if (
    getHandValue(playerDeck) === 21 &&
    getHandValue(dealerDeck) !== 21
  ) {
    console.log("Blackjack! You Win!");
    gameplayButtons.forEach((button) => (button.disabled = true));
    // this 1.5 works in console but not in the game, need to figure out why
    moneyTotal += betSize * 1.5;
    moneyTotalDisplay.textContent = moneyTotal;
  } else if (getHandValue(dealerDeck) > 21) {
    console.log("Dealer Busted! You Win!");
    gameplayButtons.forEach((button) => (button.disabled = true));
    moneyTotal += betSize;
    moneyTotalDisplay.textContent = moneyTotal;
  } else if (
    getHandValue(playerDeck) > getHandValue(dealerDeck) &&
    hitButton.disabled === true
  ) {
    console.log("You Win!");
    gameplayButtons.forEach((button) => (button.disabled = true));
    moneyTotal += betSize;
    moneyTotalDisplay.textContent = moneyTotal;
  } else if (
    getHandValue(playerDeck) < getHandValue(dealerDeck) &&
    hitButton.disabled === true
  ) {
    console.log("Dealer Wins!");
    gameplayButtons.forEach((button) => (button.disabled = true));
    moneyTotal -= betSize;
    moneyTotalDisplay.textContent = moneyTotal;
  } else if (
    getHandValue(playerDeck) === getHandValue(dealerDeck) &&
    hitButton.disabled === true
  ) {
    console.log("Push! It's a tie!");
    gameplayButtons.forEach((button) => (button.disabled = true));
  }
};

const hitButton = document.getElementById("hit-button");
hitButton.addEventListener("click", function () {
  drawCard(playerDeck);
  playerTotalDisplay.textContent = getHandValue(playerDeck);
  console.log("Your Hand:", playerDeck);
  winCondition();
});

//stand button

const standButton = document.getElementById("stand-button");
standButton.addEventListener("click", function () {
  console.log("You Stand");
  // disables buttons when player stands, this lets the win condition function check if you have stood
  gameplayButtons.forEach((button) => (button.disabled = true));
  while (getHandValue(dealerDeck) < 17) {
    drawCard(dealerDeck);
    dealerTotalDisplay.textContent = getHandValue(dealerDeck);
  }
  winCondition();
});

// double down button
const doubleDownButton = document.getElementById("double-down-button");

doubleDownButton.addEventListener("click", function () {
  if (betSize === 0) {
    alert("You must have an initial bet to double down!");
  } else if (moneyTotal >= betSize * 2) {
    betSize = betSize * 2;
    console.log("You doubled down! Your bet is now: $" + betSize + " for this hand.");
    drawCard(playerDeck);
    playerTotalDisplay.textContent = getHandValue(playerDeck);
    console.log("Your Hand:", playerDeck);
    while (getHandValue(dealerDeck) < 17) {
      drawCard(dealerDeck);
      dealerTotalDisplay.textContent = getHandValue(dealerDeck);
    }
    gameplayButtons.forEach((button) => (button.disabled = true));
    winCondition();
    betSize = betSize / 2;
    console.log("Your bet is back to your previous bet size: $" + betSize);
  }
});

// split button
const splitButton = document.getElementById("split-button");

// i guess related to start buttons i forget
gameplayButtons.forEach((button) => (button.style.display = "none"));
startButton.style.display = "inline-block";

// start button
startButton.addEventListener("click", function () {
  gameplayButtons.forEach((button) => (button.style.display = "inline-block"));
  startButton.style.display = "none";
  drawCard(playerDeck);
  drawCard(playerDeck);
  drawCard(dealerDeck);
  drawCard(dealerDeck);
  playerTotalDisplay.textContent = getHandValue(playerDeck);
  dealerTotalDisplay.textContent = getHandValue(dealerDeck);
  if (getHandValue(playerDeck) === 21 && getHandValue(dealerDeck) !== 21) {
    console.log("Blackjack! You Win!");
    gameplayButtons.forEach((button) => (button.disabled = true));
  } else if (
    getHandValue(playerDeck) === 21 &&
    getHandValue(dealerDeck) === 21
  ) {
    console.log("Push! It's a tie!");
    gameplayButtons.forEach((button) => (button.disabled = true));
  }
});

// game start , money input, etc
moneyTotalDisplay = document.getElementById("money-total");
betSizeButton = document.getElementById("bet-size-button");
betSizeDisplay = document.getElementById("bet-size");

let moneyTotal = 1000;
moneyTotalDisplay.textContent = moneyTotal;
let betSize = 200;
betSizeDisplay.textContent = betSize;

//adjust this to in class syntax
betSizeButton.addEventListener("click", function () {
  betSize = prompt("Enter your bet size:");
  if (betSize && !isNaN(betSize)) {
    betSize = parseInt(betSize);
    if (betSize > moneyTotalDisplay.textContent) {
      alert("You don't have enough money!");
      betSize = 0;
    }
  }
  betSizeDisplay.textContent = betSize;
});
