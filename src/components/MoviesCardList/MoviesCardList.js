import { NavLink } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const cardList = props.films.map((film) => {
    return <MoviesCard film={film} key={film.nameRU}/>
  })

  return (
    <div className='card-list'>
    {
      cardList.length > 0 ?
        (
          <div className='card-list__cards'>{cardList}</div>
        ) :
        (
          <p className='card-list__empty'>Тут пока ничего нет. Добавьте любимое кино на странице
            <NavLink to='/movies' className='link-animation card-list__link'> Фильмы</NavLink>!
          </p>
        )
    }
    </div>
  );
}

export default MoviesCardList;