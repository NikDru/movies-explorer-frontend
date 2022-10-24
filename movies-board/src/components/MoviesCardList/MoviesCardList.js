import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  const cards = [];
  for (let i = 0; i < 5; i++) {
    cards.push(MoviesCard());
  }
  return (
    <div className='card-list'>
      {cards}
    </div>
  );
}

export default MoviesCardList;