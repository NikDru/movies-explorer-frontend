import photo from '../../images/card_photo.png';

function MoviesCard(props) {
  return (
    <div className='card'>
      <img className='card__photo' src={photo} alt='Movie photo'/>
      <div className='card__sign'>
        <p className='card__name'>Gimme Danger: История Игги и The Stooges</p>
        {
          true ?
            <button className='card__delete'></button> :
            <button className='button-animation card__like'></button>
        }
      </div>
      <p className='card__length'>1ч 42м</p>
    </div>
  );
}

export default MoviesCard;