import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Sign from '../Sign/Sign';

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <Sign
      signIn={false}
      signature={
        (
          <p className='sign__text'>Уже зарегистрированы? <NavLink to='/sign-in' className='link-animation sign__link'>Войти</NavLink></p>)
        }
      headerText={'Добро пожаловать!'}
      buttonText={'Зарегистрироваться'}
      formValues={{name, email, password}}
      handleSubmit={props.handleSubmit}
    >
      <div className='sign__input-block'>
        <label className='sign__label'>Имя</label>
        <input className='sign__input' type='text' value={name} onChange={handleNameChange}></input>
        <span className='sign__input-error'></span>
      </div>
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

export default Register;