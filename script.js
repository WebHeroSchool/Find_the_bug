let content = document.getElementById('content');
let cardTable = document.getElementById('card-table');


//Установим количество карт на столе согластно уровню сложности
function setCards (level) {

  const card = document.getElementById('card');
  console.log(card);
  
  for (let i=1; i<level; i++) {
    let cardN = card.cloneNode(true); // клонирование карты n раз
    cardN.id = card.id + i;
    card.after(cardN);
  }

  //одну из карт сделаем багом
  let numBug = getRandomInt(1, level);
  let gameOverCards = document.getElementsByClassName('game-over-card');
  gameOverCards[numBug].classList.replace('game-over-card', 'bug-card');

}

//функция по созданию события поворота на каждую карту
function flipCard(level) {
  cards = document.getElementsByClassName('card');
  console.log(cards);
  for (let i=0; i<cards.length; i++) {
    cards[i].addEventListener('click', rotationCart);
  }
}

function rotationCart() {
  console.log("функция переворота");
  this.classList.add('rotation');
  
  Array.from(cards).forEach(card => card.removeEventListener('click', rotationCart));
  this.classList.remove('rotation');
  Array.from(cards).forEach(card => card.addEventListener('click', restartCartTable));

  /*for (let i=1; i<=level; i++) {
    const idElem = 'inner' + i;
    const cart = document.getElementById(idElem);
    cart.addEventListener('click',  restartCartTable(level));
  }*/
}

function restartCartTable() {
  console.log("сюда зашли");
  //главное окно сделали активным, карточный стол скрыли
  content.classList.remove('deactivate');
  cardTable.classList.add('deactivate');

  //удалили все карты
  cards = document.getElementsByClassName('card');
  for (let i=1; i<cards.length; i++) {
    cards[i].remove();
  }
}

//создание карточного стола
function openCardTable() {
 
  let level = document.querySelector('input[name="level"]:checked').value;
  if (level.length === 0) return;

  content.classList.add('deactivate');
  cardTable.classList.remove('deactivate');
  setCards(level);

  /*cards = document.querySelectorAll('.card');
  console.log(cards);
  Array.from(cards).forEach(card => card.addEventListener('click', rotationCart()));
  console.log(cards);*/

  flipCard(level);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

  