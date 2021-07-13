let content = document.getElementById('content');
let cardTable = document.getElementById('card-table');


//Установим количество карт на столе согластно уровню сложности
function setCards (level) {

  const card = document.getElementById('card');
  console.log(card);
  let innerCard = card.childNodes[1];
  
  for (let i=1; i<level; i++) {
    let cardN = card.cloneNode(true); // клонирование карты n раз
    cardN.id = card.id + i;
    cardN.childNodes[1].id = innerCard.id + i;
    console.log(cardN.childNodes[1]);
    card.after(cardN);
  }
  innerCard.id =  innerCard.id + level; 

  //одну из карт сделаем багом
  let numBug = getRandomInt(1, level);
  let gameOverCards = document.getElementsByClassName('game-over-card');
  gameOverCards[numBug].classList.replace('game-over-card', 'bug-card');

}

//функция по созданию события поворота на каждую карту
function flipCard(level) {

  for (let i=1; i<=level; i++) {
    const idElem = 'inner' + i;
    const flip = document.getElementById(idElem);
    flip.addEventListener('click', event => flip.classList.add('rotation'));
  }
}

function setRestartForCards(level) {
  for (let i=1; i<=level; i++) {
    const idElem = 'inner' + i;
    const flip = document.getElementById(idElem);
    card.addEventListener('click', restartCartTable(level));
  }
}

function restartCartTable(level) {
  console.log("сюда зашли");
  //главное окно сделали активным, карточный стол скрыли
  content.classList.remove('deactivate');
  cardTable.classList.add('deactivate');

  //удалили все карты
  for (let i=1; i<level; i++) {
    const idElem = 'card' + i;
    const card = document.getElementById(idElem);
    card.remove();
  }
}

//создание карточного стола
function openCardTable() {
 
  let level = document.querySelector('input[name="level"]:checked').value;
  content.classList.add('deactivate');
  cardTable.classList.remove('deactivate');
  setCards(level);
  flipCard(level);
  setRestartForCards(level);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


  