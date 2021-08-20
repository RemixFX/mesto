let popupMenuButton = document.querySelector('.profile__edit-button');
let popupMenu =  document.querySelector('.popup');
let popupCloseButton =  popupMenu.querySelector('.popup__close-button');
let formElement =  popupMenu.querySelector('.form');
let nameInput =  popupMenu.querySelector('.form__input_type_name');
let jobInput =  popupMenu.querySelector('.form__input_type_job');
let nameOutput = document.querySelector('.profile__name');
let jobOutput = document.querySelector('.profile__job');


function toggleForm(evt) {
  popupMenu.classList.toggle('popup_opened');
  evt.preventDefault();
  if (popupMenu.classList.contains('popup_opened')) {
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
  }
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  toggleForm(evt);
};

popupMenuButton.addEventListener('click', toggleForm);
popupCloseButton.addEventListener('click', toggleForm);
formElement.addEventListener('submit', formSubmitHandler);
