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
      localStorage.setItem('searchedFilms', JSON.stringify(filmsApi.searchFilms(res, searchValue, switcher)));
      return this.getNextFilms(count);
    });
  }
}