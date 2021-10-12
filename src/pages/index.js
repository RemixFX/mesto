import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {settings, initialCards, popupMenuButton, nameInput, jobInput,
  elementsContainer, addCardButton, formAddCard, profileForm} from '../utils/settings.js';

// Объявление класса PopupWithImage

const popupImage = new PopupWithImage('.popup-card');
popupImage.setEventListeners();

// Объявление класса UserInfo

const profileInfo = new UserInfo('.profile__name', '.profile__job');

// Объявление класса PopupWithForm для попапа редактирования профиля

const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (data) => {
    console.log(data);
    profileInfo.setUserInfo(data);
    profilePopup.close();
  }
});
profilePopup.setEventListeners();

// открытие попапа с  формой редактирования профиля

popupMenuButton.addEventListener("click", function () {
  const data = profileInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  profileFormValidator.resetValidation();
  profilePopup.open();
});

// Функция передачи значений и открытия попапа с картинкой

const handleCardClick = (name, link) => popupImage.open({name, link});

// Функция создания карточки

const createCard = (item) => {
  const card = new Card(item, '#elements-template', handleCardClick);
  return card.generateCard();
};

// Инициализация шести карочек из массива

const renderCard = new Section({
  items: initialCards,
  renderer: (item) => {
    renderCard.addItem(createCard(item));
  }
}, elementsContainer);
renderCard.renderItems();

// Добавление карточки через попап с формой для новой карточки

const newCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (formData) => {
    renderCard.addItem(createCard(formData));
    newCardPopup.close();
  }
});
newCardPopup.setEventListeners();

// Открытие формы добавления новой карточки

addCardButton.addEventListener("click", () => {
  newCardPopup.open();
  addCardValidator.resetValidation();
});

// Запуск валидации для формы добавления новой карточки

const addCardValidator = new FormValidator(settings, formAddCard);
addCardValidator.enableValidation();

// Запуск валидации для формы изменения профиля

const profileFormValidator = new FormValidator(settings, profileForm);
profileFormValidator.enableValidation();
