import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Sign from '../Sign/Sign';
import { useFormWithValidation } from '../../userHooks/useFormWithValidation';

function Login(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    handleChange(event);
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    handleChange(event);
    setPassword(event.target.value);
  }
  return (
    <Sign
      signIn={true}
      signature={
        (
          <p className='sign__text'>Ещё не зарегистрированы? <NavLink to='/sign-up' className='link-animation sign__link'>Регистрация</NavLink></p>)
        }
      headerText={'Рады видеть!'}
      buttonText={'Войти'}
      formValues={values}
      handleChange={handleChange}
      formValid={isValid}
      handleSubmit={props.handleSubmit}
    >

          <div className='sign__input-block'>
            <label className='sign__label'>E-mail</label>
            <input
              name='email'
              className={`sign__input
                ${(errors['email'] !== undefined && errors['email'].length > 0) ? 'sign__input_error' : ''}`}
              type='text'
              value={email}
              onChange={handleEmailChange}
              required pattern="([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})"
            />
            <span className={
              `sign__input-error
              ${(errors['email'] !== undefined && errors['email'].length > 0) ? 'sign__input-error_visible' : ''}`}>
                Введите корректную почту
            </span>
          </div>
          <div className='sign__input-block'>
            <label className='sign__label'>Пароль</label>
            <input
              name='password'
              className='sign__input'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span className={`sign__input-error
              ${(errors['password'] !== undefined && errors['password'].length > 0) ? 'sign__input-error_visible' : ''}`}>
                Требуется ввести пароль
              </span>
          </div>
    </Sign>
  );
}

export default Login;