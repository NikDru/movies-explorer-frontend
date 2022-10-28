import React, { useEffect, useState } from 'react';
import Switcher from '../Switcher/Switcher';

function SearchForm(props) {
  const [searchValue, setSearchValue] = useState('');
  const [switcher, setSwitcher] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log('submit event' + searchValue + ' ' + switcher);
  }

  function handleSearchValueChange(event) {
    setSearchValue(event.target.value);
  }

  function handleShortFilmsSwitch() {
    const newValue = !switcher;
    setSwitcher(newValue);
  }

  return (
    <section className='search'>
      <form
          onSubmit={handleSubmit}>
        <div className='search__input-container'>
          <input
            type='text'
            className='search__input'
            placeholder='Фильм'
            onChange={handleSearchValueChange}
            value={searchValue}/>
          <input type='submit' className='button-animation search__button' value={'Поиск'}></input>
        </div>
        <div className='search__switcher'>
          <Switcher onChange={handleShortFilmsSwitch} value={switcher}/>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;