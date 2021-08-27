let popupMenuButton = document.querySelector('.profile__edit-button');
let popupMenu =  document.querySelector('.popup');
let popupCloseButton =  popupMenu.querySelector('.popup__close-button');
let formElement =  popupMenu.querySelector('.form');
let nameInput =  popupMenu.querySelector('.form__input_type_name');
let jobInput =  popupMenu.querySelector('.form__input_type_job');
let nameOutput = document.querySelector('.profile__name');
let jobOutput = document.querySelector('.profile__job');


function toggleForm(evt) {
  popupMenu.classList.toggle('popup_opened');
  evt.preventDefault();
  if (popupMenu.classList.contains('popup_opened')) {
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
  }
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  toggleForm(evt);
};

popupMenuButton.addEventListener('click', toggleForm);
popupCloseButton.addEventListener('click', toggleForm);
formElement.addEventListener('submit', formSubmitHandler);

//1. Шесть карточек «из коробки»

const elementsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#elements-template').content;
//const linkCard = document.querySelector('.element__image').src;
//const nameCard = document.querySelector('.element__name').textContent;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'горные хребты с переходом от заснеженных верхушек до зеленых склонов'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'ещё не замерзшее озере на опушке леса в зимнюю пору'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'плотная застройка однотипными девятиэтажными домами'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'темный грунт, редкая растительность, высокая гора с заснеженным склоном'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'железная дорога уходящая в даль, вдоль лесистой местности'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'зимнее озеро с причудливо застывшими корками льда'
  }
];

// единая функция добавления карточек

const AddCard = (element) => {
  const card = elementsTemplate.querySelector('.element').cloneNode(true);

  card.querySelector('.element__image').src = element.link;
  card.querySelector('.element__image').alt = element.alt;
  card.querySelector('.element__name').textContent = element.name;
  elementsContainer.prepend(card);
};


initialCards.forEach(element => AddCard(element));

//2. Форма добавления карточки

const popupMenuAddCard =  document.querySelector('.popup_type_add-card');
const AddCardButton = document.querySelector('.profile__add-button');
const AddCardCloseButton = popupMenuAddCard.querySelector('.popup__close-button_type_add-card');

function toggleFormAddCard() {
  popupMenuAddCard.classList.toggle('popup_opened');
};

AddCardButton.addEventListener('click', toggleFormAddCard);
AddCardCloseButton.addEventListener('click', toggleFormAddCard);

//3. Добавление карточки

const formAddCard =  popupMenuAddCard.querySelector('.form');
const nameCardInput = popupMenuAddCard.querySelector('.form__input_type_name-card');
const linkCardInput = popupMenuAddCard.querySelector('.form__input_type_link');

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  AddCard({
    link: linkCardInput.value,
    name: nameCardInput.value
  });
  formAddCard.reset();
  toggleFormAddCard();
};

formAddCard.addEventListener('submit', addCardSubmitHandler);
