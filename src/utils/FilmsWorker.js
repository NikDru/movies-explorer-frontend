/* import { useEffect, useLayoutEffect, useState } from 'react';
import useWindowSize from './useWindowSize';

function useFilmsLoader(searchValue) {
  const [films, setFilms] = useState([]);
  const [filmsCount, seFilmsCount] = useState(0);
  const [width, height] = useWindowSize();



  useEffect(() => {
    let newFilmsCount = width > 1023 ? 4 : (width > 767 ? 3 : (width > 500 ? 2 : 1));
    seFilmsCount(newFilmsCount);
  }, [width])

  useEffect(() => {
    function searchFilms(searchValue, switcher) {
      setSearch(true);
      localStorage.setItem('searchValue', searchValue);
      filmsApi.getFilms()
        .then(res => setFilms(filmsApi.searchFilms(res, searchValue, switcher, filmsCount)))
        .catch(err => console.log(err));
    }
    const filteredFilms = searchedFilms
  }, [])

  return films;
}

export default useFilmsLoader; */

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
      localStorage.setItem('searchedFilms', JSON.stringify(this._sortFilms(res, searchValue, switcher)));
      return this.getNextFilms(count);
    });
  }

  searchBySavedFilms(searchValue, switcher, likedFilms) {
    const searchedFilms = this._sortFilms(JSON.parse(localStorage.getItem('searchedFilms')), searchValue, switcher);
    const savedLikedFilms = searchedFilms.filter(n => (likedFilms.filter(l => l.movieId === n.id).length > 0));
    return savedLikedFilms;
  }

  _sortFilms(films, searchValue, switcher) {
    const sortedFilms = films.filter(film =>
      film.nameRU.toLowerCase().includes(searchValue.toLowerCase()) &&
      (!switcher || (switcher && film.duration < 40) ));
    return sortedFilms;
  }
}