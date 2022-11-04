import React, { useState } from 'react';
import { useFormWithValidation } from '../../userHooks/useFormWithValidation';
import Switcher from '../Switcher/Switcher';

function SearchForm(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation((props.searchValue !== null) && props.searchValue.length > 0);
  const [searchValue, setSearchValue] = useState(props.searchValue);
  const [switcher, setSwitcher] = useState(props.switcher);

  function handleSubmit(event) {
    event.preventDefault();
    props.handleSubmit(searchValue, switcher);
    console.log('submit event' + searchValue + ' ' + switcher);
  }

  function handleSearchValueChange(event) {
    handleChange(event);
    setSearchValue(event.target.value);
  }

  function handleShortFilmsSwitch(event) {
    setSwitcher(event.target.checked);
  }

  return (
    <section className='search'>
      <form
          onSubmit={handleSubmit}>
        <div className='search__input-container'>
          <input
            name='search__input-name'
            type='text'
            className='search__input'
            placeholder='Фильм'
            onChange={handleSearchValueChange}
            value={searchValue}
            required
            />
          <input type='submit' className='button-animation search__button' value={'Поиск'} disabled={!isValid}></input>
        </div>
        <div className='search__switcher'>
          <Switcher onChange={handleShortFilmsSwitch} value={switcher}/>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;