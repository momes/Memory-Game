"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 3000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);

let clickCount = 0;

let chosenArr = [];
let traversedArr = [];
/** Shuffle array items in-place and return shuffled array. */

const playAgain = document.getElementById("winner");

function shuffle(items) {
  // This algorit  hm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");


  for (let color of colors) {
    const card = document.createElement("div");
    card.className = "card-container";
    card.value = color;
    card.innerHTML = '<div class="card-elements" name="' + color + '"><div class="card-back" value="' + color + '"></div><div id="card-front" class="' + color + ' card-front" value="' + color + '"></div></div>';
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
  }
}


/*card element to flip*/

function findCard(element) {
  if (element.parentNode.className === "card-elements") {
    return element.parentNode;
  }
}

/** Flip a card face-up. */
function flipCard(elem) {
  elem.style = "transform: rotateY(180deg);";

}


/** Flip a card face-down. */
function unFlipCard(str) {
  document.getElementById("chosen-one").style = "transform: rotateY(180);";
  document.getElementById("chosen-two").style = "transform: rotateY(180);";

  document.getElementById("chosen-one").id = "";
  document.getElementById("chosen-two").id = "";
  clickCount = 0;
};

function displayWin() {
  playAgain.style = "display: block;"
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(e) {
  var elem = findCard(e.target);
  if (clickCount === 1 && !traversedArr.includes(elem.getAttribute("name"))) {

    if (elem != chosenArr[0]) {
      var cardColor = elem.getAttribute("name");
      elem.id = "chosen-two";
      console.log('SECOND card choice -->', cardColor, elem.id);
      chosenArr.push(elem);
      flipCard(elem);
      clickCount++
      console.log('click count', clickCount);
    }
    else {
      console.log('Same Box Chosen')
    }
  }

  if (clickCount === 0 && !traversedArr.includes(elem.getAttribute("name"))) {
    elem.id = "chosen-one";
    var cardColor = elem.getAttribute("name");
    console.log('FIRST card choice -->', cardColor, elem.id);
    chosenArr.push(elem);
    flipCard(elem);
    clickCount++
    console.log('click count', clickCount);

  }
  if (clickCount === 2) {
    if (chosenArr[0].getAttribute("name") === chosenArr[1].getAttribute("name")) {
      for (let elem of chosenArr) {
        elem.id = "";
        traversedArr.push(elem.getAttribute("name"));
      }
      console.log('MATCH FOUND');

      chosenArr = [];
      clickCount = 0;
      console.log('clickCount reset to', clickCount);
      if (traversedArr.length === 10) {
        setTimeout(function () { displayWin() }, 1000);
        console.log('game won!');
      }
    }

    else {
      console.log('NO MATCH', chosenArr[0].getAttribute("name"), chosenArr[1].getAttribute("name"))
      setTimeout(function () { unFlipCard() }, 1000);

      console.log('clickCount reset to', clickCount);
      chosenArr = [];
    }
  }
  e.preventDefault;
  // ... you need to write this ...
}


