import React, { useState } from 'react';
import Header from "../Header/Header";
import { useLocation, NavLink } from 'react-router-dom';

function Profile(props) {
  const [name, setName] = React.useState('Виталий');
  const [email, setEmail] = React.useState('ya@yandex.ru');
  const [correction, setCorrection] = useState(false);

  function editFields() {
    setCorrection(true);
  }

  return (
    <section className='profile'>
      <h1 className='profile__header'>Привет, Виталий!</h1>
      <form
          action="#">
        <div className='profile__input-container'>
          <label className='profile__input-label'>Имя</label>
          <input type='text' className='profile__input profile__input_type_name'  value={name} />
        </div>
        <div className='profile__input-container'>
          <label className='profile__input-label'>E-mail</label>
          <input type='text' className='profile__input profile__input_type_email' value={email} />
        </div>
        {
          <div className='profile__footer'>
          {
            correction === true ?
            (
              <input type='submit' className='profile__save-button' value={'Сохранить'}></input>
            ) :
            (
              <>
                <p className='link-animation profile__edit' onClick={editFields}>Редактировать</p>
                <NavLink to='/' className='link-animation profile__exit'>Выйти из аккаунта</NavLink>
              </>
            )
          }
          </div>
        }
      </form>
    </section>
  );
}

export default Profile;