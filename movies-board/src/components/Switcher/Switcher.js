function SearchForm(props) {
  return (
    <>
      <label className='switcher'>
        <input className='switcher__input' type='checkbox' value={props.shortFilms}/>
        <span className='switcher__slider'></span>
      </label>
      <span className='switcher__text'>Короткометражки</span>
    </>
  );
}

export default SearchForm;