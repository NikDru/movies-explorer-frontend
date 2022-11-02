import Api from './Api';

class MoviesExplorerApi extends Api {
  setToken(jwt) {
    this._headers.Authorization = `Bearer ${jwt}`;
  }

  deleteToken() {
    delete this._headers.Authorization;
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

  getMovies(userEmail) {
    return fetch(this._baseUrl + "/movies", {
      headers: this._headers
    })
      .then(res => this._checkServerAnswer(res))
      .then(res => { return res.filter(film => film.owner.email === userEmail)});
  }

  likeFilm(film) {
    return fetch(this._baseUrl + "/movies", {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(film)
    })
      .then(res => this._checkServerAnswer(res));
  }

  deleteFilm(filmID) {
    return fetch(this._baseUrl + "/movies/" + filmID, {
        headers: this._headers,
        method: 'DELETE'
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


const moviesExplorerApi = new MoviesExplorerApi({
  baseUrl: 'https://api.movies-board.diploma.nomoredomains.icu',
  //baseUrl: 'http://localhost:51555',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesExplorerApi;
