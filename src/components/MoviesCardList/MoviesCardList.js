import { NavLink } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const cards = [];
  for (let i = 0; i < props.filmsCount; i++) {
    cards.push(MoviesCard());
  }
  return (
    <div className='card-list'>
    {
      cards.length > 0 ?
        (
          <div className='card-list__cards'>{cards}</div>
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