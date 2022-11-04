import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Extra from '../Extra/Extra';

function Movies(props) {
  return (
    <main>
      <SearchForm />
      <MoviesCardList filmsCount={12}/>
      <Extra />
    </main>
  );
}

export default Movies;