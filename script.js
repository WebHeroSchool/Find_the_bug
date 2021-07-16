let content = document.getElementById('content');
let cardTable = document.getElementById('card-table');


//Установим количество карт на столе согластно уровню сложности
function setCards (level) {

  const card = document.querySelector('.card');
  console.log(card);
  
  for (let i=1; i<level; i++) {
    let cardN = card.cloneNode(true); // клонирование карты n раз
    cardN.classList.add("copy");
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
/* Функция выполняет непосредственно переворот карты и 
навешивает событие по рестарту для каждой карты*/
function rotationCart() {
  console.log("функция переворота");
  this.classList.add('rotation');
  
  //удаляем у всех карт событие переворота
  Array.from(cards).forEach(card => card.removeEventListener('click', rotationCart));
  //добавляем всем картам событие рестарта 
  Array.from(cards).forEach(card => card.addEventListener('click', restartCartTable));
}

/* Функция скрывает стол с картами, при этом удаляя все карты
 и активирует главное меню */
function restartCartTable() {
  console.log("сюда зашли");
  
  //главное окно сделали активным, карточный стол скрыли
  content.classList.remove('deactivate');
  cardTable.classList.add('deactivate');

  //удалили все карты-копии 
  document.querySelectorAll('.copy').forEach(elem => elem.remove());
}

//создание карточного стола
function openCardTable() {
 
  let level = document.querySelector('input[name="level"]:checked').value;
  if (level.length === 0) return;

  content.classList.add('deactivate');
  cardTable.classList.remove('deactivate');
  
  setCards(level);
  flipCard(level);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

  