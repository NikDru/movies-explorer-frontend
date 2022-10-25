import { NavLink } from 'react-router-dom';
import Sign from '../Sign/Sign';

function Login(props) {
  return (
    <Sign
      signIn={true}
      signature={
        (
          <p className='sign__text'>Ещё не зарегистрированы? <NavLink to='/sign-up' className='link-animation sign__link'>Регистрация</NavLink></p>)
        }
      headerText={'Рады видеть!'}
      buttonText={'Войти'}
      >

          <div className='sign__input-block'>
            <label className='sign__label'>E-mail</label>
            <input className='sign__input' type='text'></input>
            <span className='sign__input-error'></span>
          </div>
          <div className='sign__input-block'>
            <label className='sign__label'>Пароль</label>
            <input className='sign__input' type='password'></input>
            <span className='sign__input-error'>Что-то пошло не так</span>
          </div>
    </Sign>
  );
}

export default Login;