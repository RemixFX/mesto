//объявляем функцию показа ошибки

const showInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

//объявляем функцию скрытия ошибки

const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  //errorElement.textContent = '';
};

//объявляем функцию, которая проверяет валидно ли поле формы и вызывает фукнцию показа
//или скрытия ошибки

checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputErrorClass, errorClass);
  } else {
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
  };
};

//объявляем функцию для кнопки submit, которая проверяет валидны ли ВСЕ поля в этой форме

checkFormValidity = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

//объявляем функцию для кнопки submit, которая включает или выключает кнопку
//в зависимости от того, валидны ли все поля в этой форме

toggleButtonStyle = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const battonElement = formElement.querySelector(submitButtonSelector);
  if (checkFormValidity(inputList)) {
    battonElement.classList.add(inactiveButtonClass);
    battonElement.setAttribute('disabled', 'fuck');
  } else {
    battonElement.classList.remove(inactiveButtonClass);
    battonElement.removeAttribute('disabled');
  }
};

//объявляем функцию навешивания слушателей

setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonStyle(formElement, inputList, submitButtonSelector, inactiveButtonClass);
    });
  });
  toggleButtonStyle(formElement, inputList, submitButtonSelector, inactiveButtonClass);
};

//объявляем функцию валидации, которая получает массив настроек в качестве аргумента
//и вызывает функцию навешивания слушателей

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      config.inputSelector,
      config.submitButtonSelector,
      config.inputErrorClass,
      config.errorClass,
      config.inactiveButtonClass
      );
  });
};

//вызываем функцию валидации с переданными настройками

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
});

