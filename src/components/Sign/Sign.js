import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Sign(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.handleSubmit(props.formValues);
  }

  return (
    <>
      <header className='sign__header'>
        <NavLink to='/'>
          <img className='sign__logo' src={logo} alt='Logo'/>
        </NavLink>
        <h1 className='sign__title'>{props.headerText}</h1>
      </header>
      <section className='sign__body'>
        <form className='sign__form' onSubmit={handleSubmit}>
          {props.children}
        <input
          className={`button-animation sign__button ${props.signIn === true ? 'sign__button_sign-in' : ''}`}
          type="submit"
          value={props.buttonText}
          disabled={!props.formValid}></input>
        </form>
        <div className='sign__signature'>
          {props.signature}
        </div>
      </section>
    </>
  );
}

export default Sign;