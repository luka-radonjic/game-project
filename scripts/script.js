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

//this doesnt work
const cardsLeft = deck.length;

function drawCard() {
    let cardDrawn = deck.splice(getRandomCard(0, cardsLeft), 1);
    playerDeck.push(cardDrawn);
}

