import React, { useEffect, useState } from 'react';
import Switcher from '../Switcher/Switcher';

function SearchForm(props) {
  const [searchValue, setSearchValue] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('submit event');
  }

  function handleSearchValueChange(event) {
    setSearchValue(event.target.value);
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
          <input type='submit' className='button-animation search__button'>Поиск</input>
        </div>
        <div className='search__switcher'>
          <Switcher />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;