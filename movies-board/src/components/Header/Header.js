import logo from '../../images/logo.svg';

function Header(props) {
  return (
    <header className='header'>
      <div className='header__navigation'>
        <img src={logo} alt='Logo' className='header__logo'/>
        <div className='header__links'>
          <p className='header__signup'>Регистрация</p>
          <button type='button' className='header__signin-button'>Войти</button>
        </div>
      </div>
    </header>
  );
}

export default Header;