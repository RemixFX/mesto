export default class UserInfo {
  constructor(profileNameSelector, profileJobSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
  }

  getUserInfo () {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    }
  }

  setUserInfo (data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.job;
    console.log(data.name);
    console.log(data.job);
  }
}
