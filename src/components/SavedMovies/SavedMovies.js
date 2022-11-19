import React, { useEffect, useState, useContext, useRef } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FilmsWorker from '../../utils/FilmsWorker';
import moviesExplorerApi from '../../utils/MoviesExplorerApi';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function SavedMovies(props) {
  const currentUser = useContext(CurrentUserContext);
  const [films, setFilms] = useState([]);
  const [likedFilms, setLikedFilms] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [switcher, setSwitcher] = useState(false);
  const errorSetter = useRef(props.errorSetter);

  useEffect(() => {
    function getLikedFilms() {
      moviesExplorerApi.getMovies(currentUser.email)
        .then(res => {
          const searchedFilms = fixLinks(res);
          setSearched(true);
          setFilms(searchedFilms);
          setLikedFilms(searchedFilms);
        })
        .catch((err) => {
          errorSetter.current(err);
        })
    };
    getLikedFilms();
  }, [currentUser])

  useEffect(() => {
    if (searched) {
      const filmsWorker = new FilmsWorker();
      const newFilms = filmsWorker.sortFilms(likedFilms, searchValue, switcher);
      setFilms(newFilms);
    }
  }, [likedFilms, switcher, searchValue, searched])

  function fixLinks(filmsArray) {
    const fixedFilmsArray = filmsArray.map(el => {
      return {...el, image: {url: el.image}}});
    return fixedFilmsArray;
  }

  function searchFilms(searchValue, switcher) {
    setSearched(true);
    setSearchValue(searchValue);
    setSwitcher(switcher);
    const filmsWorker = new FilmsWorker();
    const newFilms = filmsWorker.sortFilms(likedFilms, searchValue, switcher);
    setFilms(newFilms);
    console.log('render saved-movies');
  }

  function handleDeleteFilm(film) {
    moviesExplorerApi.deleteFilm(film._id)
    .then(res => {
      const newLikedFilms = likedFilms.filter(f => f._id !== film._id);
      setLikedFilms(newLikedFilms);
    })
    .catch((err) => {
      props.errorSetter(err);
    })
  }
  return (
    <>
      <Header signedIn={props.loggedIn} fontStyle='white' onSideMenuClick={props.onSideMenuClick}/>
      <main>
        <SearchForm
          searchValue={''}
          switcher={false}
          handleSubmit={searchFilms}
        />
        <MoviesCardList
          films={films}
          likedFilms={films}
          deleteFilm={handleDeleteFilm}
          searched={searched}
          />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;