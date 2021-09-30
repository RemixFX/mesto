export class Card {

  constructor(data, cardSelector, openImageHandler) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._openImageHandler = openImageHandler;
    this._cardSelector = cardSelector;
  }

  _getTemplate () {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

  return cardElement;
  };

  generateCard () {
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector('.element__image');
    this._element.querySelector('.element__name').textContent = this._name;
    elementImage.src = this._link;
    elementImage.alt = this._alt;
    this._setEventListeners();

    return this._element;
  }

  _addLike (evt) {
    evt.target.classList.toggle("element__like-button_type_active");
  }

  _animation () {
    this._element.classList.add("element-animated");
  }

  _removeCard () {
    this._element.remove();
  }

  _setEventListeners () {
    this._element.querySelector('.element__like-button')
    .addEventListener('click', (evt) => this._addLike(evt));

    this._element.querySelector('.element__delete-button')
    .addEventListener('click', () => this._animation());

    this._element.addEventListener('animationend', () => this._removeCard());

    this._element.querySelector('.element__image')
    .addEventListener('click', () => this._openImageHandler(this._name, this._link));
  }
};
