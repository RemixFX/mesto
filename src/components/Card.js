export class Card {

  constructor(data, cardSelector, userId, handleCardClick, {addLike, deleteLike,
    handleRemoveClick})
    {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._userId = userId;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
    this._handleRemoveClick = handleRemoveClick;
    this._element = this._getTemplate();
    this._elementDeleteButton = this._element.querySelector('.element__delete-button');
    this.likeButton = this._element.querySelector('.element__like-button');
    this.likeValue = this._element.querySelector('.element__like-value');
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
    const elementImage = this._element.querySelector('.element__image');
    this._element.querySelector('.element__name').textContent = this._name;
    elementImage.src = this._link;
    elementImage.alt = this._alt;
    this.likeValue.textContent = this._likes.length;
    this._checkOwnerCard ();
    this._checkOwnerLike ();
    this._setEventListeners();
    return this._element;
  }

  setLikeValue (res) {
    this.likeValue.textContent = res.likes.length;
  }

  _toggleLikeButton (evt) {
    if (!evt.target.classList.contains('element__like-button_type_active')) {
      this._addLike(this._cardId);
      this.likeButton.classList.add('element__like-button_type_active');
    } else {
      this._deleteLike(this._cardId);
      this.likeButton.classList.remove('element__like-button_type_active');
    }
  }

  _removeCard () {
    this._element.remove();
  }

  _checkOwnerLike () {
    if (this._likes.some(elem => elem._id === this._userId)) {
      this.likeButton.classList.add('element__like-button_type_active');
    }
  }

  _checkOwnerCard () {
    if (this._owner !== this._userId) {
      this._elementDeleteButton.classList.add("element__delete-button_disabled");
    }
  }

  _setEventListeners () {
    this.likeButton.addEventListener('click', (evt) => this._toggleLikeButton(evt));

    this._elementDeleteButton.addEventListener('click', () => {
        this._handleRemoveClick({
          cardNode: this._element,
          cardId: this._cardId
        });
      });

    this._element.addEventListener('animationend', () => this._removeCard());

    this._element.querySelector('.element__image')
    .addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
};
