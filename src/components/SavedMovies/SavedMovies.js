import React, { useEffect, useState, useContext } from 'react';
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

  useEffect(() => {
    function getLikedFilms() {
      moviesExplorerApi.getMovies(currentUser.email)
      .then(res => {
        setLikedFilms(res);
      })
    };
    getLikedFilms();
  }, [currentUser])

  useEffect(() => {
    if (searched) {
      const filmsWorker = new FilmsWorker();
      const newFilms = filmsWorker.searchBySavedFilms(searchValue, switcher, likedFilms);
      setFilms(newFilms);
    }
  }, [likedFilms, switcher, searchValue, searched])

  function searchFilms(searchValue, switcher) {
    setSearched(true);
    setSearchValue(searchValue);
    setSwitcher(switcher);
    //setSearch(true);
    const filmsWorker = new FilmsWorker();
    const newFilms = filmsWorker.searchBySavedFilms(searchValue, switcher, likedFilms);
    setFilms(newFilms);
    console.log('render saved-movies');
  }

  function handleDeleteFilm(film) {
    moviesExplorerApi.deleteFilm(likedFilms.filter(f => f.movieId === film.id)[0]._id)
    .then(res => {
      const newLikedFilms = likedFilms.filter(f => f.movieId !== film.id);
      setLikedFilms(newLikedFilms);
    })
  }
  return (
    <>
      <Header signedIn={props.loggedIn} style='white' onSideMenuClick={props.onSideMenuClick}/>
      <main>
        <SearchForm
          searchValue={''}
          switcher={false}
          handleSubmit={searchFilms}
        />
        <MoviesCardList films={films} likedFilms={likedFilms} deleteFilm={handleDeleteFilm}/>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;