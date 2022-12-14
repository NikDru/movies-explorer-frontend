import { NavLink } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const location = useLocation();
  const cards = props.films.map((film) => {
    return <MoviesCard
              film={film}
              key={film.nameRU}
              handleLikeFilm={props.handleLikeFilm}
              liked={props.likedFilms.some(likedFilm => likedFilm.movieId === film.id)}
              deleteFilm={props.deleteFilm}
              />
  })

  return (
    <div className='card-list'>
    {
      props.error ? (
        <p className='card-list__empty'>Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз
        </p>
      ) :
      (
        props.searched ?
        (
          props.preloader ?
            <Preloader /> :
            (
              cards.length > 0 ?
                (
                  <div className='card-list__cards'>{cards}</div>
                ) :
                (
                  location.pathname === '/saved-movies' ?
                    (
                      <p className='card-list__empty'>Тут пока ничего нет. Добавьте любимое кино на странице
                        <NavLink to='/movies' className='link-animation card-list__link'> Фильмы</NavLink>!
                      </p>
                    ) :
                    <p className='card-list__empty'>Ничего не найдено</p>
                )
            )
        ) :
        (
          <p className='card-list__empty'>Пожалуйста, введите ключевое слово для поиска!</p>
        )
      )
    }
    </div>
  );
}

export default MoviesCardList;