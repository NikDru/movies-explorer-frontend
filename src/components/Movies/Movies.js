import React, { useEffect, useState, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Extra from '../Extra/Extra';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
/* import filmsApi from '../../utils/BeatsMoviesApi'; */
import FilmsWorker from '../../utils/FilmsWorker';
import useWindowSize from '../../userHooks/useWindowSize';
import moviesExplorerApi from '../../utils/MoviesExplorerApi';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function Movies(props) {
  const currentUser = useContext(CurrentUserContext);
  const [search, setSearch] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [films, setFilms] = useState([]);
  const [likedFilms, setLikedFilms] = useState([]);
  const [initialFilmsCount, setInitialFilmsCount] = useState(0);
  const [extraFilmsCount, setExtraFilmsCount] = useState(0);
  const [width] = useWindowSize();

  useEffect(() => {
    let newInitialFilmsCount = width > 1023 ? 12 : (width > 767 ? 12 : (width > 500 ? 8 : 5));
    let newExtraFilmsCount = width > 1023 ? 4 : (width > 768 ? 3 : (width > 500 ? 2 : 1));
    setInitialFilmsCount(newInitialFilmsCount);
    setExtraFilmsCount(newExtraFilmsCount);
  }, [width])

  useEffect(() => {
    function getInfoFromLocalStorage() {
      const returnedFilms = localStorage.getItem('returnedFilms') !== null ? JSON.parse(localStorage.getItem('returnedFilms')) : [];
      setFilms(returnedFilms);
    }
    function getLikedFilms() {
      moviesExplorerApi.getMovies(currentUser.email)
      .then(res => {
        setLikedFilms(res);
      })
    }
    getInfoFromLocalStorage();
    getLikedFilms();
  }, [currentUser])

  function searchFilms(searchValue, switcher) {
    setSearch(true);
    setPreloader(true);
    const filmsWorker = new FilmsWorker();
    filmsWorker.searchFilms(searchValue, switcher, initialFilmsCount).then(res => {
      setFilms(res[0]);
      setHasMore(res[1]);
      setPreloader(false);
    })
  }

  function handleClickMore() {
    const filmsWorker = new FilmsWorker();
    const [newFilms, newHasMore] = filmsWorker.getNextFilms(extraFilmsCount);
    setFilms(films.concat(newFilms));
    setHasMore(newHasMore);
  }


  function handleLikeFilm(newFilm) {
    moviesExplorerApi.likeFilm({
      country: newFilm.country,
      director: newFilm.director,
      duration: newFilm.duration,
      year: newFilm.year,
      description: newFilm.description,
      image: newFilm.image.url,
      trailerLink: newFilm.trailerLink,
      thumbnail: newFilm.image.formats.thumbnail.url,
      nameRU: newFilm.nameRU,
      nameEN: newFilm.nameEN,
      movieId: newFilm.id
    })
    .then(res => {
      likedFilms.push(res);
      setLikedFilms([...likedFilms]);
    })
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
      <Header signedIn={props.loggedIn} fontStyle='white' onSideMenuClick={props.onSideMenuClick}/>
      <main>
        <SearchForm
          searchValue={localStorage.getItem('searchValue')}
          switcher={localStorage.getItem('switcher') === 'true'}
          handleSubmit={searchFilms}
        />
        {
          <MoviesCardList
            films={films}
            likedFilms={likedFilms}
            handleLikeFilm={handleLikeFilm}
            deleteFilm={handleDeleteFilm}
            searched={search}
            preloader={preloader}
          />
        }
        {
          hasMore &&
          <Extra handleClickMore={handleClickMore}/>
        }
      </main>
      <Footer />
    </>
  );
}

export default Movies;