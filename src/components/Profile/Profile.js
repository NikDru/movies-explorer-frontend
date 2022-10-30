import React, { useEffect, useState, useContext } from 'react';
import Header from "../Header/Header";
import { useLocation, NavLink } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [correction, setCorrection] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email)
  }, [currentUser]);

  function editFields() {
    setCorrection(true);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  return (
    <>
      <Header style='white' onSideMenuClick={props.onSideMenuClick}/>
      <section className='profile'>
        <h1 className='profile__header'>Привет, {name}!</h1>
        <form
            action="#">
          <div className='profile__input-container'>
            <label className='profile__input-label'>Имя</label>
            <input type='text' className='profile__input profile__input_type_name' value={name} onChange={handleNameChange} disabled={!correction}/>
          </div>
          <div className='profile__input-container'>
            <label className='profile__input-label'>E-mail</label>
            <input type='text' className='profile__input profile__input_type_email' value={email} onChange={handleEmailChange} disabled={!correction}/>
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
                  <button type='button' className='link-animation profile__exit' onClick={props.onExit}>Выйти из аккаунта</button>
                </>
              )
            }
            </div>
          }
        </form>
      </section>
    </>
  );
}

export default Profile;