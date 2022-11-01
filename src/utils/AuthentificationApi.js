import Api from './Api';

class AuthentificationApi extends Api {
  setToken(jwt) {
    this._headers.Authorization = `Bearer ${jwt}`;
  }

  checkToken(jwt) {
    return fetch(this._baseUrl + "/users/me", {headers: {"Authorization": `Bearer ${jwt}`, ...this._headers}})
      .then(res => this._checkServerAnswer(res));
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers
    })
      .then(res => this._checkServerAnswer(res));
  }

  editProfile(newUserInfo) {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(newUserInfo)
    })
      .then(res => this._checkServerAnswer(res));
  }

  changeAvatar(avatarLink) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(avatarLink)
    })
      .then(res => this._checkServerAnswer(res));
  }

  getCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers
    })
      .then(res => this._checkServerAnswer(res));
  }

  createNewCard(card) {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(card)
    })
      .then(res => this._checkServerAnswer(res));
  }

  deleteCard(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID, {
        headers: this._headers,
        method: 'DELETE'
      })
    .then(res => this._checkServerAnswer(res));
  }

  likeCard(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID + "/likes", {
      headers: this._headers,
      method: 'PUT'
    })
    .then(res => this._checkServerAnswer(res));
  }

  unlikeCard(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID + "/likes", {
      headers: this._headers,
      method: 'DELETE'
    })
    .then(res => this._checkServerAnswer(res));
  }

  changeLikeCardStatus(cardID, like) {
    return fetch(this._baseUrl + "/cards/" + cardID + "/likes", {
      headers: this._headers,
      method: like ? 'PUT' : 'DELETE'
    })
    .then(res => this._checkServerAnswer(res));
  }
  signIn(userInfo) {
    return fetch(this._baseUrl + "/signin", {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify(userInfo)
      })
    .then(res => this._checkServerAnswer(res));
  }

  signUp(userInfo) {
    return fetch(this._baseUrl + "/signup", {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify(userInfo)
      })
    .then(res => this._checkServerAnswer(res));
  }
}


const authentificationApi = new AuthentificationApi({
  baseUrl: 'https://api.movies-board.diploma.nomoredomains.icu',
  //baseUrl: 'http://localhost:51555',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default authentificationApi;
