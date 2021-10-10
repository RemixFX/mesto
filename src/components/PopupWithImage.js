import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(name, link, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open ({imagePopupName, imagePopupLink}) {
    super.open({imagePopupName, imagePopupLink});
    imagePopupName.textContent = this._name;
    imagePopupLink.src = this._link;
  }

  close () {
    super.close();
  }

  _handleEscClose (evt) {
    super._handleEscClose(evt);
  }

  setEventListeners() {
    super.setEventListeners();
  }

}

