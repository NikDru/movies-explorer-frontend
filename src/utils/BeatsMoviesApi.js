import Api from './Api';

class BeatsFilmsApi extends Api {
  constructor(options) {
    super(options);
    let films = [];
    let sortedFilms = [];
  }

  getFilms() {
    console.log('Запрашиваем фильмы!');
    return fetch(this._baseUrl, {
      headers: this._headers
    })
      .then(res => this._checkServerAnswer(res))
      .then(res => this.films = res);
  }

  searchFilms(searchField) {
    this.sortedFilms = this.films.filter(film => film.nameRu.includes(searchField));
    return this.sortedFilms;
  }
}

const filmsApi = new BeatsFilmsApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default filmsApi;
