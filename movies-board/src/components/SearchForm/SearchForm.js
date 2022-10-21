import Switcher from '../Switcher/Switcher';

function SearchForm(props) {
  return (
    <section className='search'>
      <div className='search__input-container'>
        <input type='text' className='search__input' placeholder='Фильм'/>
        <button className='search__button'>Поиск</button>
      </div>
      <div className='search__switcher'>
        <Switcher />
      </div>
    </section>
  );
}

export default SearchForm;