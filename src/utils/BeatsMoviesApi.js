import Api from './Api';

class BeatsFilmsApi extends Api {
  getFilms() {
    console.log('Запрашиваем фильмы!');
    return fetch(this._baseUrl, {
      headers: this._headers
    })
      .then(res => this._checkServerAnswer(res));
  }

  searchFilms(films, searchValue, switcher) {
    const sortedFilms = films.filter(film =>
      film.nameRU.toLowerCase().includes(searchValue.toLowerCase()) &&
      (!switcher || (switcher && film.duration < 40) ));
    return sortedFilms;
  }
}

const filmsApi = new BeatsFilmsApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default filmsApi;
