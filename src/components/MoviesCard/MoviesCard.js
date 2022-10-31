import photo from '../../images/card_photo.png';

function MoviesCard(props) {
  return (
    <div className='card'>
      <img className='card__photo' src={'https://api.nomoreparties.co' + props.film.image.url} alt='Movie thumbnail'/>
      <div className='card__sign'>
        <p className='card__name'>{props.film.nameRU}</p>
        {
          true ?
            <button type='button' className='card__delete'></button> :
            <button type='button' className='button-animation card__like'></button>
        }
      </div>
      <p className='card__length'>{Math.floor(props.film.duration / 60) + 'ч ' + (props.film.duration % 60) + 'м'}</p>
    </div>
  );
}

export default MoviesCard;