const popupMenuButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit-profile");
const popups = document.querySelectorAll(".popup");
const formElement = profilePopup.querySelector(".form");
const nameInput = profilePopup.querySelector(".form__input_type_name");
const jobInput = profilePopup.querySelector(".form__input_type_job");
const nameOutput = document.querySelector(".profile__name");
const jobOutput = document.querySelector(".profile__job");

// Единая функция открытия модальных окон

function openModalWindow(modalWindow) {
  modalWindow.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

// Единая функция закрытия модальных окон

function closeModalWindow(modalWindow) {
  modalWindow.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

// Вызов функции закрытия модальных окон через клавишу Escape

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closeModalWindow(openedPopup);
  }
};

// Вызов функции закрытия модальных окон в случае клика на крест и оверлей

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closeModalWindow(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closeModalWindow(popup);
    };
  });
});

// Функция вставки значений из текстовых полей на сайт и закрытие формы

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  closeModalWindow(profilePopup);
}

// Вызов формы и подгрузка значений в поля формы из сайта

popupMenuButton.addEventListener("click", function () {
  openModalWindow(profilePopup);
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
});

// Отправка формы

formElement.addEventListener("submit", formSubmitHandler);

// Шесть карточек «из коробки»

const elementsContainer = document.querySelector(".elements");
const elementsTemplate = document.querySelector("#elements-template").content;
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "горные хребты с переходом от заснеженных верхушек до зеленых склонов",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "ещё не замерзшее озере на опушке леса в зимнюю пору",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "плотная застройка однотипными девятиэтажными домами",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "темный грунт, редкая растительность, высокая гора с заснеженным склоном",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "железная дорога уходящая в даль, вдоль лесистой местности",
  },
  {
    name: "Минск",
    link: "https://adukar.by/images/photo/fasad-isz-1.jpg",
    alt: "Институт современных знаний имени А.М. Широкова",
  },
];

//  Лайк карточки

const addLike = (evt) =>
  evt.target.classList.toggle("element__like-button_type_active");

// Аннимация перед удалением карточки

const animation = (evt) => {
  evt.target.closest(".element").classList.add("element-animated");
  evt.target.closest(".element").addEventListener("animationend", removeCard);
};

// Удаление карточки

const removeCard = (evt) => evt.target.closest(".element").remove();

// Функция подгрузки атрибутов в попап открытия картинки

const imagePopup = document.querySelector(".popup-card");
const imagePopupLink = imagePopup.querySelector(".popup-card__image");
const imagePopupName = imagePopup.querySelector(".popup-card__image-name");

const addAttrubuteToImagePopup = (evt) => {
  imagePopupLink.src = evt.target.src;
  imagePopupName.textContent = evt.target.closest(".element").textContent;
};

// Функция создания карточек

const createCard = (element) => {
  const card = elementsTemplate.querySelector(".element").cloneNode(true);
  const cardImage = card.querySelector(".element__image");

  cardImage.src = element.link;
  cardImage.alt = element.alt;
  cardImage.addEventListener("click", (evt) => {
    openModalWindow(imagePopup);
    addAttrubuteToImagePopup(evt);
  });
  card.querySelector(".element__name").textContent = element.name;
  card
    .querySelector(".element__delete-button")
    .addEventListener("click", animation);
  card
    .querySelector(".element__like-button")
    .addEventListener("click", addLike);

  return card;
};

// Единая функция добавления карточек

const addCard = (element) => {
  elementsContainer.prepend(createCard(element));
};

// Добавление шести карочек из массива

initialCards.forEach((element) => {
  addCard(element);
});

// Вызов функции открытия формы добавления карточки

const popupMenuAddCard = document.querySelector(".popup_type_add-card");
const addCardButton = document.querySelector(".profile__add-button");

addCardButton.addEventListener("click", () => openModalWindow(popupMenuAddCard));

// Добавление карточки

const formAddCard =  popupMenuAddCard.querySelector('.form');
const nameCardInput = popupMenuAddCard.querySelector('.form__input_type_name-card');
const linkCardInput = popupMenuAddCard.querySelector('.form__input_type_link');
const submitButtonAddCard = popupMenuAddCard.querySelector('.form__submit-button')

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  addCard({
    link: linkCardInput.value,
    name: nameCardInput.value,
    alt: 'Не удалось загрузить картинку по указанному адресу'
  });
  formAddCard.reset();

  submitButtonAddCard.classList.add('form__submit-button_disabled');
  submitButtonAddCard.setAttribute('disabled', 'true');
  closeModalWindow(popupMenuAddCard);
}

formAddCard.addEventListener('submit', addCardSubmitHandler);
