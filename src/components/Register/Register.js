import { NavLink } from 'react-router-dom';
import Sign from '../Sign/Sign';

function Register(props) {
  return (
    <Sign
      signIn={false}
      signature={
        (
          <p className='sign__text'>Уже зарегистрированы? <NavLink to='/sign-in' className='link-animation sign__link'>Войти</NavLink></p>)
        }
      headerText={'Добро пожаловать!'}
      buttonText={'Зарегистрироваться'}
      >

          <div className='sign__input-block'>
            <label className='sign__label'>Имя</label>
            <input className='sign__input' type='text'></input>
            <span className='sign__input-error'></span>
          </div>
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

export default Register;