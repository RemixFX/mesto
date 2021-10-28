export default class UserInfo {
  constructor(profileNameSelector, profileJobSelector, profileAvatarSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo () {
    return {
      name: this._profileName.textContent,
      about: this._profileJob.textContent
    }
  }

  setUserInfo (data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.about;
    this._profileAvatar.src = data.avatar;
  }

}
