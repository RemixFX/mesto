export default class UserInfo {
  constructor(profileNameSelector, profileJobSelector) {
    this._profileNameSelector = document.querySelector(profileNameSelector);
    this._profileJobSelector = document.querySelector(profileJobSelector);
  }

  getUserInfo () {
    return {
      name: this._profileNameSelector.textContent,
      job: this._profileJobSelector.textContent
    }
  }

  setUserInfo ({nameInput, jobInput}) {
    this._profileNameSelector.textContent = nameInput.value;
    this._profileJobSelector.textContent = jobInput.value;
  }
}
