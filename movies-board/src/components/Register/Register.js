import logo from '../../images/logo.svg';

function Register(props) {
  return (
    <>
      <header className=''>
        <img src={logo} alt='Logo'/>
        <h1>Добро пожаловать!</h1>
      </header>
      <section className='signup'>
        <form className='signup__form'>
          <div className='signup__input-block'>
            <label className='signup__label'>Имя</label>
            <input className='signup__input' type='text'></input>
            <span className='signup__input-error'></span>
          </div>
          <div className='signup__input-block'>
            <label className='signup__label'>E-mail</label>
            <input className='signup__input' type='text'></input>
            <span className='signup__input-error'></span>
          </div>
          <div className='signup__input-block'>
            <label className='signup__label'>Пароль</label>
            <input className='signup__input' type='password'></input>
            <span className='signup__input-error'>Что-то пошло не так</span>
          </div>
        <input className="button-animation signup__button" type="submit" value={'Зарегистрироваться'}></input>
        </form>
        <p className='signup__text'>Уже зарегистрированы? <a className='link-animation signup__link' href='#'>Войти</a></p>
      </section>
    </>
  );
}

export default Register;