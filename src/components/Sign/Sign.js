import logo from '../../images/logo.svg';

function Sign(props) {
  return (
    <>
      <header className='sign__header'>
        <img className='sign__logo' src={logo} alt='Logo'/>
        <h1 className='sign__title'>{props.headerText}</h1>
      </header>
      <section className='sign__body'>
        <form className='sign__form'>
          {props.children}
        <input
          className={`button-animation sign__button ${props.signIn === true ? 'sign__button_sign-in' : ''}`}
          type="submit"
          value={props.buttonText}></input>
        </form>
        <div className='sign__signature'>
          {props.signature}
        </div>
      </section>
    </>
  );
}

export default Sign;