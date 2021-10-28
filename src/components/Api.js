import { data } from "autoprefixer";

export default class Api {
  constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
  }

  getUserData() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}. Не удаётся получить данные профиля`);
    })
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}. Не удаётся получить данные карточек`);
    })
  }

  patchUserData(userdata) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userdata.name,
        about: userdata.about
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}. Не удаётся обновить данные профиля`);
    })
  }

  uploadNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}. Не удаётся загрузить картинку`);
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}. Не удаётся удалить карточку`);
    })
  }

  sendLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}. Не удаётся поставить лайк`);
    })
  }

  removeLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}. Не удаётся удалить лайк`);
    })
  }

  patchUserAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}. Не удаётся загрузить аватар`);
    })
  }

}
