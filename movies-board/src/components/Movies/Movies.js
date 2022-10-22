import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <main className='movies main'>
      <SearchForm />
      <MoviesCardList />
      <section className='extra'>
        <button className='button-animation extra-button'>Ещё</button>
      </section>
    </main>
  );
}

export default Movies;