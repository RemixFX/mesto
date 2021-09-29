export const settings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

export class FormValidator {
  constructor(settings, formSelector) {
    this._formSelector = formSelector;
    this._formElement = document.querySelector(this._formSelector)
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

  }

  //объявляем функцию показа ошибки

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  //объявляем функцию скрытия ошибки

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
  }

  //объявляем функцию, которая проверяет валидно ли поле формы и вызывает фукнцию показа
  //или скрытия ошибки

  _checkInputValidity (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, this._inputErrorClass, this._errorClass);
    } else {
      this._hideInputError(inputElement, errorElement, this._inputErrorClass, this._errorClass);
    };
  };

  //объявляем функцию для кнопки submit, которая проверяет валидны ли ВСЕ поля в этой форме

  _checkFormValidity (inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

  //объявляем функцию для кнопки submit, которая включает или выключает кнопку
  //в зависимости от того, валидны ли все поля в этой форме

  _toggleButtonStyle (inputList, buttonElement) {
    if (this._checkFormValidity(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'good');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  //объявляем функцию навешивания слушателей

  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonStyle(inputList, buttonElement);
      });
    });
    this._toggleButtonStyle(inputList, buttonElement);
  }

  //функция включения валидации

  enableValidation () {
    this._setEventListeners();
  }

}
