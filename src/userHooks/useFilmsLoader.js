import { useEffect, useLayoutEffect, useState } from 'react';
import useWindowSize from './useWindowSize';
import filmsApi from '../utils/BeatsMoviesApi';

function useFilmsLoader(searchValue, switcher) {
  const [films, setFilms] = useState([]);
  const [searchedFilms, setSearchedFilms] = useState([]);
  const [initialFilmsCount, setInitialFilmsCount] = useState(0);
  const [extraFilmsCount, setExtraFilmsCount] = useState(0);
  const [width, height] = useWindowSize();


  const getNumberOfFilms = (count) => {
    let returnedFilms = films;
    const returnedFilmsLength = returnedFilms.length;
    for (let i = returnedFilmsLength; i < (returnedFilmsLength + count) && i < searchedFilms.length; i++) {
      returnedFilms.push(searchedFilms[i]);
    }
    return returnedFilms
  }

  const getNextFilms = () => {
    setFilms(getNumberOfFilms(extraFilmsCount));
  }

  useEffect(() => {
    localStorage.setItem('searchValue', searchValue);
    filmsApi.getFilms()
      .then(res => {
        const films = filmsApi.searchFilms(res, searchValue, switcher);
        setSearchedFilms(getNumberOfFilms(initialFilmsCount));
      })
      .catch(err => console.log(err));
  }, [searchValue, initialFilmsCount, switcher])

  useEffect(() => {
    let newInitialFilmsCount = width > 1023 ? 12 : (width > 767 ? 12 : (width > 500 ? 8 : 5));
    let newFilmsCount = width > 1023 ? 4 : (width > 767 ? 3 : (width > 500 ? 2 : 1));
    setInitialFilmsCount(newInitialFilmsCount);
    setExtraFilmsCount(newFilmsCount);
  }, [width]);

  return [films, getNextFilms];
}

export default useFilmsLoader;