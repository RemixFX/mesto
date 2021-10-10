export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handler = (evt) => this._handleEscClose(evt);
  }

  open () {
    this._popupSelector.classList.add("popup_opened")
    document.addEventListener("keydown", this._handler);
  }

  close () {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handler);
  }

  _handleEscClose (evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners () {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__close-button")) {
        this.close();
      };
    });
  }

}
