import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
      <Header />
      <main className='movies main'>
        <SearchForm />
        <MoviesCardList />
        <section className='extra'>
          <button className='extra-button'>Ещё</button>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;