const cards = document.querySelectorAll(".flip-card");
const cardContainer = document.querySelector(".container");
const moves = document.querySelector(".moves");
const time = document.querySelector(".time");
const modal = document.getElementById("popup1");
const closeicon = document.querySelector(".close");
const restartIcon = document.querySelector(".restart-icon");
const modalBtn = document.querySelector(".play-again");

let count = 0;
let cardOne = null;
let cardTwo = null;
let step = 0;
let interval;
const cardsArray = [];

// cards
const cardList = [...cards];
// shufflecards
const shuffledCards = shuffle(cardList);

// modal events
restartIcon.addEventListener("click", startGame);
modalBtn.addEventListener("click", playAgain);

//fisher-yates shuffle algorithm
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// startgame
function startGame() {
  resetStatus();
  const shuffledCards = shuffle(cardList);
  shuffledCards.forEach(card => {
    cardContainer.appendChild(card);
  });
  reset();
}
// game start on window loaded
window.onload = startGame();

// flipping the card and checking
function flipCard() {
  if (this === cardOne) return;
  !this.classList.contains("open") && this.classList.add("open");
  step++;
  moves.innerHTML = step;
  if (step === 1) {
    startTimer();
  }
  cardOne !== null ? ((cardTwo = this), count++) : ((cardOne = this), count++);
  if (count === 2) {
    shuffledCards.forEach(card => {
      card.removeEventListener("click", flipCard);
    });
    cardMatching();
  }
}

//matching the card
function cardMatching() {
  if (cardOne.dataset.number !== cardTwo.dataset.number) {
    unMatched();
  } else {
    cardsArray.push(cardOne, cardTwo);
    reset();
    finishGame();
    return;
  }
}

//handle the unmatched
function unMatched() {
  cardOne.children[1].classList.add("shaking");
  cardTwo.children[1].classList.add("shaking");
  setTimeout(() => {
    cardOne.classList.remove("open");
    cardTwo.classList.remove("open");
    cardOne.children[1].classList.remove("shaking");
    cardTwo.children[1].classList.remove("shaking");
    reset();
  }, 2500);
}

//reset card matching config
function reset() {
  cardOne = null;
  cardTwo = null;
  count = 0;
  shuffledCards.forEach(card => {
    card.addEventListener("click", flipCard);
  });
}

// reset all game status
function resetStatus() {
  step = 0;
  moves.innerHTML = step;
  clearInterval(interval);
  time.innerHTML = `00:00`;
  cardsArray.length = 0;
  shuffledCards.forEach(card => {
    card.classList.remove("open");
  });
}

//finish the game with modal
function finishGame() {
  if (cardsArray.length === 12) {
    finalTime = time.innerHTML;
    modal.classList.add("show");
    document.getElementById("finalMove").innerHTML = step;
    document.getElementById("totalTime").innerHTML = finalTime;
    closeModal();
    resetStatus();
  }
}

//modal
function closeModal() {
  closeicon.addEventListener("click", function(e) {
    modal.classList.remove("show");
    startGame();
  });
}

//playagain button
function playAgain() {
  modal.classList.remove("show");
  startGame();
}

// game timer
function startTimer() {
  let sec = 0;
  let min = 0;
  interval = setInterval(function() {
    time.innerHTML = `${numTwoDigit(min)}:${numTwoDigit(sec)}`;
    sec++;
    if (sec == 60) {
      min++;
      sec = 0;
    }
  }, 1000);
}

function numTwoDigit(num) {
  return (num < 10 ? "0" : "") + num;
}
