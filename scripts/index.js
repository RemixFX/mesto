const popupMenuButton = document.querySelector('.profile__edit-button');
const popupMenu =  document.querySelector('.popup');
const popupCloseButton =  popupMenu.querySelector('.popup__close-button');
const formElement =  popupMenu.querySelector('.form');
const nameInput =  popupMenu.querySelector('.form__input_type_name');
const jobInput =  popupMenu.querySelector('.form__input_type_job');
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__job');


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

// Шесть карточек «из коробки»

const elementsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#elements-template').content;
const imagePopup = document.querySelector('.popup-card');
const imagePopupLink = document.querySelector('.popup-card__image');
const imagePopupName = document.querySelector('.popup-card__image-name');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button_type_image-popup');
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

//  Лайк карточки

const addLike = evt => evt.target.classList.toggle('element__like-button_type_active');

// Удаление карточки

const removeCard = evt => evt.target.closest('.element').remove();

// Открытие попапа с картинкой

const openImagePopup = (evt) => {
  imagePopup.classList.add('popup_opened');
  imagePopupLink.src = evt.target.src;
  imagePopupName.textContent = evt.target.closest('.element').textContent;
};

// Закрытие попапа с картинкой

const closeImagePopup = () => imagePopup.classList.remove('popup_opened');

imagePopupCloseButton.addEventListener('click', closeImagePopup);

// главная функция добавления карточек

const addCard = (element) => {
  const card = elementsTemplate.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__image');

  cardImage.src = element.link;
  cardImage.alt = element.alt;
  cardImage.addEventListener('click', openImagePopup);
  card.querySelector('.element__name').textContent = element.name;
  card.querySelector('.element__delete-button').addEventListener('click', removeCard);
  card.querySelector('.element__like-button').addEventListener('click', addLike);
  elementsContainer.prepend(card);
};

initialCards.forEach(element => addCard(element));

// Форма добавления карточки

const popupMenuAddCard =  document.querySelector('.popup_type_add-card');
const AddCardButton = document.querySelector('.profile__add-button');
const AddCardCloseButton = popupMenuAddCard.querySelector('.popup__close-button_type_add-card');

function toggleFormAddCard() {
  popupMenuAddCard.classList.toggle('popup_opened');
};

AddCardButton.addEventListener('click', toggleFormAddCard);
AddCardCloseButton.addEventListener('click', toggleFormAddCard);

// Добавление карточки

const formAddCard =  popupMenuAddCard.querySelector('.form');
const nameCardInput = popupMenuAddCard.querySelector('.form__input_type_name-card');
const linkCardInput = popupMenuAddCard.querySelector('.form__input_type_link');

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  addCard({
    link: linkCardInput.value,
    name: nameCardInput.value,
    alt: 'Не удалось загрузить картинку по указанному адресу'
  });
  formAddCard.reset();
  toggleFormAddCard();
};

formAddCard.addEventListener('submit', addCardSubmitHandler);
