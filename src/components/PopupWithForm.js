import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit, popupSelector}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close () {
    super.close();
    this._form.reset();
  }

  // Улучшенный UX всех форм

  renderLoading (isLoading, text) {
    const element = this._popup.querySelector('.popup__submit-button');
    if (isLoading) {
      element.textContent = 'Сохранение...';
    } else if (!isLoading) {
      element.textContent = `${text}`;
    }
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
