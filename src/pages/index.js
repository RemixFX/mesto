import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {settings, initialCards, popupMenuButton, nameInput, jobInput,
  elementsContainer, imagePopupName, imagePopupLink,
  addCardButton, formAddCard, profileForm} from '../components/settings.js';

// Отправка формы редактирования профиля

const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (FormData) => {
    const profileInfo = new UserInfo('.profile__name', '.profile__job');
    profileInfo.setUserInfo({nameInput, jobInput}, FormData);
    profilePopup.close();
  }
});

// открытие попапа с  формой редактирования профиля

popupMenuButton.addEventListener("click", function () {
  const profileInfo = new UserInfo('.profile__name', '.profile__job');
  const data = profileInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  profilePopup.open();
});
profilePopup.setEventListeners();

// Функция передачи значений и открытия попапа с картинкой

const handleCardClick = (name, link) => {
  const popupImage = new PopupWithImage(name, link, '.popup-card');
  popupImage.open({imagePopupName, imagePopupLink});
  popupImage.setEventListeners();
};

// Инициализация шести карочек из массива

const createCard = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#elements-template', handleCardClick);
    createCard.addItem(card.generateCard());
  }
}, elementsContainer);
createCard.renderItems();

// Добавление карточки через попап с формой для новой карточки

const newCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (FormData) => {
   const Newcard = new Card(FormData, '#elements-template', handleCardClick);
        createCard.addItem(Newcard.generateCard());
        newCardPopup.close();
        addCardValidator.toggleButtonState();
      }
    }, elementsContainer);

// Открытие формы добавления новой карточки

addCardButton.addEventListener("click", () => newCardPopup.open());
newCardPopup.setEventListeners();

// Запуск валидации для формы добавления новой карточки

const addCardValidator = new FormValidator(settings, formAddCard);
addCardValidator.enableValidation();

// Запуск валидации для формы изменения профиля

new FormValidator(settings, profileForm).enableValidation();
