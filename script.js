let content = document.getElementById("main-content");
let cardTable = document.getElementById("card-table");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/* Функция скрывает стол с картами, при этом удаляя все карты
 и активирует главное меню */
 function restartCartTable() {
  
  //главное окно сделали активным, карточный стол скрыли
  content.classList.remove("deactivate");
  cardTable.classList.add("deactivate");

  //удаляем класс с переворотом
  document.querySelectorAll(".rotation").forEach((elemRotation) => elemRotation.classList.remove("rotation"));

  //удаляем всем картам событие рестарта 
  document.querySelectorAll(".card").forEach((card) => card.removeEventListener("click", restartCartTable));
  
  //удалили все карты-копии 
  document.querySelectorAll(".copy").forEach((elem) => elem.remove());
}

/* Функция выполняет непосредственно переворот карты и 
навешивает событие по рестарту для каждой карты*/
function rotationCart() {
  this.classList.add("rotation");
  let cards = document.getElementsByClassName("card");

  //удаляем у всех карт событие переворота
  Array.from(cards).forEach((card) => card.removeEventListener("click", rotationCart));
  //добавляем всем картам событие рестарта 
  Array.from(cards).forEach((card) => card.addEventListener("click", restartCartTable));
}

//Установим количество карт на столе согластно уровню сложности
function setCards (level) {

  const card = document.querySelector(".card");
  
  for (let i=1; i<level; i++) {
    let cardN = card.cloneNode(true); // клонирование карты n раз
    cardN.classList.add("copy");
    card.after(cardN);
  }

  const cardTable = document.getElementById("card-table");
  if(level > 8) {
    cardTable.classList.add("card-table_ten");
  } else if(cardTable.classList.contains("card-table_ten")) {
    cardTable.classList.remove("card-table_ten");
  }

  //одну из карт сделаем багом
  let numBug = getRandomInt(1, level);
  let gameOverCards = document.getElementsByClassName("game-over-card");
  gameOverCards[numBug].classList.replace("game-over-card", "bug-card");

}

//функция по созданию события поворота на каждую карту
function flipCard(level) {
  let flipCards = document.getElementsByClassName("card");
  for (let i=0; i<flipCards.length; i++) {
    flipCards[i].addEventListener("click", rotationCart);
  }
}

//создание карточного стола
function openCardTable() {
 
  let level = document.querySelector("input[name='level']:checked").value;
  if (level.length === 0) { return; }

  content.classList.add("deactivate");
  cardTable.classList.remove("deactivate");
  
  setCards(level);
  flipCard(level);
}



  