export const settings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

export const initialCards = [
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
    name: "Уральск",
    link: "https://www.alem-edu.kz/wp-content/uploads/2020/04/0.jpg",
    alt: "Западно-Казахстанский государственный университет им. М. Утемисова",
  },
];

export const imagePopupLink = document.querySelector(".popup-card__image");
export const imagePopupName = document.querySelector(".popup-card__image-name");
export const popupMenuButton = document.querySelector(".profile__edit-button");
export const nameInput = document.querySelector(".form__input_type_name");
export const jobInput = document.querySelector(".form__input_type_job");
export const elementsContainer = ".elements";
export const addCardButton = document.querySelector(".profile__add-button");
export const formAddCard =  document.querySelector('.form-add-card');
export const profileForm = document.querySelector(".form-profile");

