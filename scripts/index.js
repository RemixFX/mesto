const popupMenuButton = document.querySelector('.profile__edit-button');
const popupMenu =  document.querySelector('.popup');
const popupCloseButton =  popupMenu.querySelector('.popup__close-button');
const formElement =  popupMenu.querySelector('.form');
const nameInput =  popupMenu.querySelector('.form__input_type_name');
const jobInput =  popupMenu.querySelector('.form__input_type_job');
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__job');

// Единая функция открытия модальных окон

function openModalWindow(modalWindow) {
  modalWindow.classList.add('popup_opened');
}

// Единая функция закрытия модальных окон

function closeModalWindow(modalWindow) {
  modalWindow.classList.remove('popup_opened');
};

 // Функция вставки значений из текстовых полей на сайт и закрытие формы

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  closeModalWindow(popupMenu);
};

// Вызов формы и подгрузка значений в поля формы из сайта

popupMenuButton.addEventListener('click', function() {
  openModalWindow(popupMenu);
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
});

// Закрытие формы

popupCloseButton.addEventListener('click', () => closeModalWindow(popupMenu));

// Отправка формы

formElement.addEventListener('submit', formSubmitHandler);

// Шесть карточек «из коробки»

const elementsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#elements-template').content;
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
    name: 'Томск',
    link: 'http://dn1.vtomske.ru/a/8e76edba16c67593c95cd3b2b3eabff0_.jpg',
    alt: 'томский техникум информационных технологий &#128591;'
  }
];

//  Лайк карточки

const addLike = evt => evt.target.classList.toggle('element__like-button_type_active');

// Удаление карточки

const removeCard = evt => evt.target.closest('.element').remove();

// Функция подгрузки атрибутов в попап открытия картинки

const imagePopup = document.querySelector('.popup-card');
const imagePopupLink = imagePopup.querySelector('.popup-card__image');
const imagePopupName = imagePopup.querySelector('.popup-card__image-name');

const addAttrubuteToImagePopup = (evt) => {
  imagePopupLink.src = evt.target.src;
  imagePopupName.textContent = evt.target.closest('.element').textContent;
};

// Закрытие попапа с картинкой
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button_type_image-popup');
imagePopupCloseButton.addEventListener('click', () => closeModalWindow(imagePopup));

// Главная функция добавления карточек

const addCard = (element) => {
  const card = elementsTemplate.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__image');

  cardImage.src = element.link;
  cardImage.alt = element.alt;
  cardImage.addEventListener('click', (evt) => {
    openModalWindow(imagePopup);
    addAttrubuteToImagePopup(evt);
  });
  card.querySelector('.element__name').textContent = element.name;
  card.querySelector('.element__delete-button').addEventListener('click', removeCard);
  card.querySelector('.element__like-button').addEventListener('click', addLike);
  elementsContainer.prepend(card);
};

initialCards.forEach(addCard);

// Вызов функции открытия/закрытия для формы добавления карточки

const popupMenuAddCard =  document.querySelector('.popup_type_add-card');
const addCardButton = document.querySelector('.profile__add-button');
const addCardCloseButton = popupMenuAddCard.querySelector('.popup__close-button_type_add-card');

addCardButton.addEventListener('click', () => openModalWindow(popupMenuAddCard));
addCardCloseButton.addEventListener('click', () => closeModalWindow(popupMenuAddCard));

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
  closeModalWindow(popupMenuAddCard);
};

formAddCard.addEventListener('submit', addCardSubmitHandler);

