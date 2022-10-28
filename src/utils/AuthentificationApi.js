import Api from './Api';

class AuthentificationApi extends Api {
  getUserInfo(jwt) {
    return fetch(this._baseUrl + "/users/me", {headers: {"Authorization": `Bearer ${jwt}`, ...this._headers}})
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
