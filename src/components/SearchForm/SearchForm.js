import Switcher from '../Switcher/Switcher';

function SearchForm(props) {
  return (
    <section className='search'>
      <form className='search__form'>
        <div className='search__input-container'>
          <input type='text' className='search__input' placeholder='Фильм' required/>
          <button type='submit' className='button-animation search__button'>Поиск</button>
        </div>
        <div className='search__switcher'>
          <Switcher />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;