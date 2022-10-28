export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkServerAnswer(res) {
    if (res.ok) {
      return res.json()
    }
    else {
      return Promise.reject(`Ошибка выполнения, status: ${res.status}`);
    }
  }
}

