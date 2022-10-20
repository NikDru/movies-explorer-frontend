import earthWebImage from '../../../images/earth_web.svg';
import logo from '../../../images/logo.svg';

function Promo(props) {
  return (
      <header className='header'>
        <div className='header__navigation'>
          <img src={logo} alt='Logo' className='header__logo'/>
          <div className='header__links'>
            <p>Регистрация</p>
            <button type='button' className='header__signin-button'>Войти</button>
          </div>
        </div>
        <div className='header__main'>
          <div className='header__text'>
            <h1 className='header__title'>Учебный проект студента факультета Веб-разработки.</h1>
            <p className='header__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          </div>
          <img src={earthWebImage} alt='Earth'/>
        </div>
        <button className='header__add-info-button'>Узнать больше</button>
      </header>
  );
}

export default Promo;