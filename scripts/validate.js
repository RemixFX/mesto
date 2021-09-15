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

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputErrorClass, errorClass);
  } else {
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
  };
};

//объявляем функцию для кнопки submit, которая проверяет валидны ли ВСЕ поля в этой форме

const checkFormValidity = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

// объявляем функцию проверки на пустые строки при запуске формы

//const hasNotInputValues = (inputList) => {
//  return inputList.some(inputElement => {
//    return inputElement.value.length === 0;
//  });
//};

//объявляем функцию для кнопки submit, которая включает или выключает кнопку
//в зависимости от того, валидны ли все поля в этой форме

const toggleButtonStyle = (inputList, buttonElement, inactiveButtonClass) => {
  if (checkFormValidity(inputList)) {    // || hasNotInputValues(inputList) is not work
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'good');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

//объявляем функцию навешивания слушателей

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonStyle(inputList, buttonElement, inactiveButtonClass);
    });
  });
  toggleButtonStyle(inputList, buttonElement, inactiveButtonClass);
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

