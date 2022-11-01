import React, { useEffect, useState, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Extra from '../Extra/Extra';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
/* import filmsApi from '../../utils/BeatsMoviesApi'; */
import FilmsWorker from '../../utils/FilmsWorker';
import useWindowSize from '../../userHooks/useWindowSize';

function Movies(props) {
  const [search, setSearch] = useState(false);
  const [searchedValue, setSearchedValue] = useState('');
  const [switcher, setSwitcher] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [films, setFilms] = useState([]);
  const [initialFilmsCount, setInitialFilmsCount] = useState(0);
  const [extraFilmsCount, setExtraFilmsCount] = useState(0);
  const [width, height] = useWindowSize();

  useEffect(() => {
    let newInitialFilmsCount = width > 1023 ? 12 : (width > 767 ? 12 : (width > 500 ? 8 : 5));
    let newExtraFilmsCount = width > 1023 ? 4 : (width > 768 ? 3 : (width > 500 ? 2 : 1));
    setInitialFilmsCount(newInitialFilmsCount);
    setExtraFilmsCount(newExtraFilmsCount);
  }, [width])

  useEffect(() => {
    function getInfoFromLocalStorage() {
      const returnedFilms = localStorage.getItem('returnedFilms') !== null ? JSON.parse(localStorage.getItem('returnedFilms')) : [];
      const localSearchedValue = localStorage.getItem('searchValue');
      const localSwitcher = localStorage.getItem('switcher');
      setFilms(returnedFilms);
      setSearchedValue(localSearchedValue);
      setSwitcher(localSwitcher);
    }
    getInfoFromLocalStorage();
  }, [])

  function searchFilms(searchValue, switcher) {
    setSearch(true);
    const filmsWorker = new FilmsWorker();
    filmsWorker.searchFilms(searchValue, switcher, initialFilmsCount).then(res => {
      setFilms(res[0]);
      setHasMore(res[1]);
    })
  }

  function handleClickMore() {
    const filmsWorker = new FilmsWorker();
    const [newFilms, newHasMore] = filmsWorker.getNextFilms(extraFilmsCount);
    setFilms(films.concat(newFilms));
    setHasMore(newHasMore);
  }

  return (
    <>
      <Header signedIn={props.loggedIn} style='white' onSideMenuClick={props.onSideMenuClick}/>
      <main>
        <SearchForm
          initialSearchValue={searchedValue}
          initialSwitcher={switcher}
          handleSubmit={searchFilms}
        />
        <MoviesCardList films={films}/>
        {
          hasMore && <Extra handleClickMore={handleClickMore}/>
        }

      </main>
      <Footer />
    </>
  );
}

export default Movies;