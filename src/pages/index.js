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

// Объявление класса PopupWithImage

const popupImage = new PopupWithImage('.popup-card');
popupImage.setEventListeners();

// Редактирование профиля через попап формы

const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (data) => {
    profilePopup.renderLoading(true)
    api.patchUserData(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => profilePopup.renderLoading(false, 'Сохранить'));
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
    avatarEditPopup.renderLoading(true);
    api.patchUserAvatar(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => avatarEditPopup.renderLoading(false, 'Сохранить'));
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
  {handleAddLike: (_id, card) => {
    api.sendLike(_id)
    .then((res) => {
      card.setLikeValue(res)
      card.addLike(card)
    })
    .catch((err) => console.log(err));
  },
  handleDeleteLike: (_id, card) => {
    api.removeLike(_id)
    .then((res) => {
      card.setLikeValue(res)
      card.deleteLike(card)
    })
    .catch((err) => console.log(err));
  },
  handleRemoveClick: cardinfo => {
    popupWithConfirmation.cardinfo = cardinfo;
    popupConfirmationHeading.textContent = 'Вы уверены?'
    popupWithConfirmation.open()}
  });
  return card.generateCard();
};

// Функция рендера карточек

const renderCard = new Section({
  renderer: (item) => {
    renderCard.addItem(createCard(item));
  }
}, elementsContainer);

// Получения данных профиля и загрузка массива карточек с сервера

let userId;
api.getPageInfo()
.then(([userData, cardList]) => {
  profileInfo.setUserInfo(userData);
  userId = userData._id;
  renderCard.renderItems(cardList);
})
.catch((err) => {
  console.log(err);
});

// Добавление карточки через попап формы

const newCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (data) => {
    newCardPopup.renderLoading(true);
    api.uploadNewCard(data)
    .then((res) => {
      renderCard.renderItems([res]);
      newCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => newCardPopup.renderLoading(false, 'Создать'));
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
