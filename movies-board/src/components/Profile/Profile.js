import React from 'react';
import Header from "../Header/Header";
import { useLocation, NavLink } from 'react-router-dom';

function Profile(props) {
  return (
    <section className='profile'>
      <h1 className='profile__header'>Привет, Виталий!</h1>
      <div className='profile__input-container'>
        <label className='profile__input-label'>Имя</label>
        <input type='text' className='profile__input profile__input_type_name' />
      </div>
      <div className='profile__input-container'>
        <label className='profile__input-label'>E-mail</label>
        <input type='text' className='profile__input profile__input_type_email' />
      </div>
      <p className='link-animation profile__edit'>Редактировать</p>
      <NavLink to='/' className='link-animation profile__exit'>Выйти из аккаунта</NavLink>
    </section>
  );
}

export default Profile;