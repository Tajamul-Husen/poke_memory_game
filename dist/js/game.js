class MemoryGame {
  constructor() {
    this.cards = document.querySelectorAll(".flip-card");
    this.cardContainer = document.querySelector(".container");
    this.moves = document.querySelector(".moves");
    this.time = document.querySelector(".time");
    this.modal = document.getElementById("popup1");
    this.closeicon = document.querySelector(".close");
    this.restartIcon = document.querySelector(".restart-icon");
    this.modalBtn = document.querySelector(".play-again");
    this.flip = false;
    this.count = 0;
    this.cardOne = null;
    this.cardTwo = null;
    this.matching = false;
    this.step = 0;
    this.value = null;
    this.interval;
    this.cardsArray = [];
    this.cardList = [...this.cards];
    this.shuffledCards = this.shuffle(this.cardList);
  }
  startGame() {
    this.shuffledCards.forEach(card => {
      card.addEventListener("click", this.flipCard);
      this.cardContainer.appendChild(card);
    });
  }

  //fisher-yates shuffle algorithm
  shuffle(array) {
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

  flipCard() {
      console.log(this)
    if (this === this.cardOne) return;
    !this.classList.contains("open") && this.classList.add("open");
    this.cardOne !== null
      ? ((this.cardTwo = this), console.log(this.cardOne))
      : ((this.cardOne = this), console.log(this.cardTwo));
    if (this.count === 2) {
      console.log(this.cardOne, this.cardTwo);
      this.shuffledCards.forEach(card => {
        card.removeEventListener("click", this.flipCard);
      });
      this.cardMatching();
    }
  }
}

let pokemon = new MemoryGame();
window.onload = pokemon.startGame();
