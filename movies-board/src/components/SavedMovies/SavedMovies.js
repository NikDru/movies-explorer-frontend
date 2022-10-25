import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Extra from '../Extra/Extra';

function SavedMovies(props) {
  return (
    <main>
      <SearchForm />
      <MoviesCardList filmsCount={0}/>
    </main>
  );
}

export default SavedMovies;