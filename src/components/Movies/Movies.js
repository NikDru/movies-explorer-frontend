import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Extra from '../Extra/Extra';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
      <Header signedIn={props.loggedIn} style='white' onSideMenuClick={props.onSideMenuClick}/>
      <main>
        <SearchForm />
        <MoviesCardList filmsCount={12}/>
        <Extra />
      </main>
      <Footer />
    </>
  );
}

export default Movies;