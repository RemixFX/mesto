export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  //объявляем функцию показа ошибки

  _showInputError(inputElement) {
    this._getErrorElement(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  //объявляем функцию скрытия ошибки

  _hideInputError(inputElement) {
    this._getErrorElement(inputElement);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
  }

  // ищем 1 раз _errorElement

  _getErrorElement(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  //объявляем функцию, которая проверяет валидно ли поле формы и вызывает фукнцию показа
  //или скрытия ошибки

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, this._inputErrorClass, this._errorClass);
    } else {
      this._hideInputError(inputElement, this._inputErrorClass, this._errorClass);
    };
  };

  //объявляем функцию для кнопки submit, которая проверяет валидны ли ВСЕ поля в этой форме

  _checkFormValidity () {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

  //объявляем функцию для кнопки submit, которая включает или выключает кнопку
  //в зависимости от того, валидны ли все поля в этой форме

  _toggleButtonState () {
    if (this._checkFormValidity(this._inputList)) { // без this._inputList не работает
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', 'good');
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  };

  //объявляем функцию принудительной очистки ошибок в инпутах

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //объявляем функцию навешивания слушателей

  _setEventListeners () {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  //функция включения валидации

  enableValidation () {
    this._setEventListeners();
  }

}
