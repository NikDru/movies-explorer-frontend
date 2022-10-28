import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Sign from '../Sign/Sign';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
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
      formValues={{email, password}}
      handleSubmit={props.handleSubmit}
      >

          <div className='sign__input-block'>
            <label className='sign__label'>E-mail</label>
            <input className='sign__input' type='text' value={email} onChange={handleEmailChange}></input>
            <span className='sign__input-error'></span>
          </div>
          <div className='sign__input-block'>
            <label className='sign__label'>Пароль</label>
            <input className='sign__input' type='password' value={password} onChange={handlePasswordChange}></input>
            <span className='sign__input-error'>Что-то пошло не так</span>
          </div>
    </Sign>
  );
}

export default Login;