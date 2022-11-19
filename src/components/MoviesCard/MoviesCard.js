import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  const location = useLocation();

  return (
    <div className='card'>
      <a className='card__link' href={props.film.trailerLink} target='_blank' rel="noreferrer">
        <img className='card__photo' src={'https://api.nomoreparties.co' + props.film.image.url} alt='Movie thumbnail'/>
      </a>
      <div className='card__sign'>
        <p className='card__name'>{props.film.nameRU}</p>
        {
          location.pathname === '/saved-movies' ?
            <button type='button' className='card__delete' onClick={() => props.deleteFilm(props.film)}></button> :
            (
              props.liked ?
              <button type='button' className={`button-animation card__like card__like_active`} onClick={() => props.deleteFilm(props.film)}></button> :
              <button type='button' className={`button-animation card__like`} onClick={() => props.handleLikeFilm(props.film)}></button>
            )
        }
      </div>
      <p className='card__length'>{Math.floor(props.film.duration / 60) + 'ч ' + (props.film.duration % 60) + 'м'}</p>
    </div>
  );
}

export default MoviesCard;