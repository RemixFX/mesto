import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, {handleConfirmButton}) {
    super(popupSelector);
    this._handleConfirmButton = handleConfirmButton;
    this._form = this._popup.querySelector('.form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirmButton(this.cardinfo);
    });
  }

}
