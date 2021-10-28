import './index.css';
import Api from '../components/Api.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {settings, popupMenuButton, nameInput, jobInput,
  popupConfirmationHeading, elementsContainer, addCardButton,
  formAddCard, profileForm, avatarEditForm, avatarEditButton} from '../utils/settings.js';

// Объявление класса Api

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-29/",
  headers: {
    authorization: "0fe39d88-814c-4d9c-a2d1-36a2026603cf",
    "Content-type": "application/json"
  }
});

// Объявление класса UserInfo

const profileInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

// Получение данных пользователя от сервера

let userId;
const userData = api.getUserData();
userData.then((data) => {
  profileInfo.setUserInfo(data);
  userId = data._id;
})
.catch((err) => {
  console.log(err);
});


// Объявление класса PopupWithImage

const popupImage = new PopupWithImage('.popup-card');
popupImage.setEventListeners();

// Редактирование профиля через попап формы

const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (data) => {
    preLoad('.popup_type_edit-profile', true)
    api.patchUserData(data)
    .then((pzdata) => {
      profileInfo.setUserInfo(pzdata);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => preLoad('.popup_type_edit-profile', false, 'Сохранить'));
  }
});
profilePopup.setEventListeners();

// Открытие попапа формы редактирования профиля

popupMenuButton.addEventListener("click", function () {
  const data = profileInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.about;
  profileFormValidator.resetValidation();
  profilePopup.open();
});

// Редактирование аватара через попап формы

const avatarEditPopup = new PopupWithForm({
  popupSelector: '.popup-avatar-edit',
  handleFormSubmit: (data) => {
    preLoad('.popup-avatar-edit', true);
    api.patchUserAvatar(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => preLoad('.popup-avatar-edit', false, 'Сохранить'));
  }
})
avatarEditPopup.setEventListeners();

// Открытие попапа редактирования аватара

avatarEditButton.addEventListener("click", () => {
  avatarEditPopup.open();
  editAvatarValidator.resetValidation();
});

// Функция передачи значений и открытия попапа с картинкой

const handleCardClick = (name, link) => popupImage.open({name, link});

// Попап с подтверждением удалении карточки

const popupWithConfirmation = new PopupWithConfirmation('.popup-confirmation',
{handleConfirmButton: cardinfo => {
  api.deleteCard(cardinfo.cardId)
  .then((res) => {
    popupConfirmationHeading.textContent = res.message;
    cardinfo.cardNode.classList.add("element-animated");
    const closeTimeout = () => popupWithConfirmation.close();
    setTimeout(closeTimeout, 800);
  })
  .catch((err) => {
    console.log(err);
  });
}
});
popupWithConfirmation.setEventListeners();

// Функция создания карточки

const createCard = (item) => {
  const card = new Card(item, '#elements-template', userId, handleCardClick,
  {addLike: _id => {
    api.sendLike(_id)
    .then((res) => card.setLikeValue(res))
    .catch((err) => console.log(err));
  },
  deleteLike: _id => {
    api.removeLike(_id)
    .then((res) => card.setLikeValue(res))
    .catch((err) => console.log(err));
  },
  handleRemoveClick: cardinfo => {
    popupWithConfirmation.cardinfo = cardinfo;
    popupConfirmationHeading.textContent = 'Вы уверены?'
    popupWithConfirmation.open()}
  });
  return card.generateCard();
};

// Загрузка карточек с сервера

api.getInitialCards()
.then((data) => {
  const renderCard = new Section({
    items: data,
    renderer: (item) => {
      renderCard.addItem(createCard(item));
    }
  }, elementsContainer);
  renderCard.renderItems();
})
.catch((err) => {
  console.log(err);
});

// Добавление карточки через попап формы

const newCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (data) => {
    preLoad('.popup_type_add-card', true);
    api.uploadNewCard(data)
    .then((res) => {
      new Section({}, elementsContainer).addItem(createCard(res));
      newCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => preLoad('.popup_type_add-card', false, 'Создать'));
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

// Запуск валидации для формы редактирования аватара

const editAvatarValidator = new FormValidator(settings, avatarEditForm);
editAvatarValidator.enableValidation();

// Улучшенный UX всех форм

const preLoad = (popupSelector, isLoading, text) => {
  const element = document
  .querySelector(popupSelector)
  .querySelector('.popup__submit-button');
  if (isLoading) {
    element.textContent = 'Сохранение...';
  } else if (!isLoading) {
    element.textContent = `${text}`;
  }
}
