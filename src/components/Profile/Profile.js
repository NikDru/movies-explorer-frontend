import React, { useEffect, useState, useContext } from 'react';
import Header from "../Header/Header";
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../userHooks/useFormWithValidation';

function Profile(props) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [prevName, setPrevName] = React.useState('');
  const [prevEmail, setPrevEmail] = React.useState('');
  const [correction, setCorrection] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email)
  }, [currentUser]);

  function editFields() {
    setPrevName(name);
    setPrevEmail(email);
    setCorrection(true);
    setButtonDisabled(true);
  }

  function checkFields(name, email) {
    if ((name === prevName) && (email === prevEmail)) {
      setButtonDisabled(true);
    }
    else {
      setButtonDisabled(false);
    }
  }

  function handleNameChange(event) {
    handleChange(event);
    checkFields(event.target.value, email);
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    handleChange(event);
    checkFields(name, event.target.value);
    setEmail(event.target.value);
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    props.handleSubmit({name, email});
    setCorrection(false);
  }

  return (
    <>
      <Header fontStyle='white' onSideMenuClick={props.onSideMenuClick}/>
      <section className='profile'>
        <h1 className='profile__header'>Привет, {currentUser.name}!</h1>
        <form
            onSubmit={handleSubmitForm}>
          <div className='profile__input-container'>
            <label className='profile__input-label'>Имя</label>
            <input
              name='profile__input_name'
              type='text'
              className={`profile__input profile__input_type_email
                ${(errors['profile__input_name'] !== undefined && errors['profile__input_name'].length > 0) ? 'profile__input-error' : ''}`}
              value={name}
              onChange={handleNameChange}
              disabled={!correction}
              pattern="[a-zA-Z0-9а-яА-Я-\s]+"
              required
              />
          </div>
          <div className='profile__input-container'>
            <label className='profile__input-label'>E-mail</label>
            <input
              name='profile__input_email'
              type='text'
              className={`profile__input profile__input_type_email
                ${(errors['profile__input_email'] !== undefined && errors['profile__input_email'].length > 0) ? 'profile__input-error' : ''}`}
              value={email}
              onChange={handleEmailChange}
              disabled={!correction}
              required
              pattern="([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})"
              />
          </div>
          {
            <div className='profile__footer'>
            {
              correction === true ?
              (
                <>
                <p>{errors['profile__input_name']}</p>
                <p>{errors['profile__input_email']}</p>
                <input type='submit' className='profile__save-button' value={'Сохранить'} disabled={!isValid || buttonDisabled}></input>
                </>
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