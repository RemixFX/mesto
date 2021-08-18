let popupMenuButton = document.querySelector('.profile__edit-button');
let popupMenu = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about-me');
let nameOutput = document.querySelector('.profile__name');
let jobOutput = document.querySelector('.profile__about-me');


function toggleForm(evt) {
  popupMenu.classList.toggle('popup_opened');
  evt.preventDefault();
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  toggleForm(evt);
};

popupCloseButton.addEventListener('click', function() {
  formElement.reset();
});

popupMenuButton.addEventListener('click', toggleForm);
popupCloseButton.addEventListener('click', toggleForm);
formElement.addEventListener('submit', formSubmitHandler);

