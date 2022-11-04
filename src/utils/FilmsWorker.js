import filmsApi from './BeatsMoviesApi';

export default class FilmsWorker {
  getNextFilms(count) {
    const searchedFilms = JSON.parse(localStorage.getItem('searchedFilms'));
    let returnedFilms = localStorage.getItem('returnedFilms') !== null ? JSON.parse(localStorage.getItem('returnedFilms')) : [];
    let currentFilms = [];
    const returnedFilmsLength = returnedFilms.length;

    for (let i = returnedFilmsLength; i < (returnedFilmsLength + count) && i < searchedFilms.length; i++) {
      currentFilms.push(searchedFilms[i]);
    }
    returnedFilms = returnedFilms.concat(currentFilms);
    localStorage.setItem('returnedFilms', JSON.stringify(returnedFilms));
    return [currentFilms, returnedFilms.length < searchedFilms.length];
  }

  searchFilms(searchValue, switcher, count) {
    localStorage.setItem('switcher', switcher);
    localStorage.setItem('searchValue', searchValue);
    localStorage.removeItem('searchedFilms', '');
    localStorage.removeItem('returnedFilms', '');
    return filmsApi.getFilms()
    .then(res => {
      localStorage.setItem('searchedFilms', JSON.stringify(this.sortFilms(res, searchValue, switcher)));
      return this.getNextFilms(count);
    });
  }

  sortFilms(films, searchValue, switcher) {
    const sortedFilms = films.filter(film =>
      film.nameRU.toLowerCase().includes(searchValue.toLowerCase()) &&
      (!switcher || (switcher && film.duration < 40) ));
    return sortedFilms;
  }
}