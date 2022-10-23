import React from 'react';
import account from '../../images/account.svg';
import account_white from '../../images/account_white.svg';
import { useLocation, NavLink } from 'react-router-dom';

function Navigation(props) {
  const linkClassName = props.main ? 'navigation__link-right' : 'navigation__link';
  const activeLinkClassName = props.main ? 'navigation__link-right_active' : 'navigation__link_active';
  return (
    <div className='navigation'>
    {
      props.signedIn ?
      (
        <div className={`navigation__movies-links ${props.main && 'navigation__movies-links_right'}`}>
          {
            props.main && (
              <NavLink
                to='/'
                exact activeClassName={activeLinkClassName}
                className={`link-animation ${linkClassName} ${props.style === 'white' && 'navigation__link_color_white'}`}>
                  Главная
              </NavLink>
            )
          }
          <NavLink
            to='/movies'
            activeClassName={activeLinkClassName}
            className={`link-animation ${linkClassName} ${props.style === 'white' && 'navigation__link_color_white'}`}>
              Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            activeClassName={activeLinkClassName}
            className={`link-animation ${linkClassName} ${props.style === 'white' && 'navigation__link_color_white'}`}>
              Сохраненные фильмы
          </NavLink>
          <NavLink
            to='/profile'
            className={`button-animation navigation__profile-link ${props.style === 'white' && 'navigation__profile-link_color_white'}`}>
            <img src={props.style === 'white' ? account : account_white} className='navigation__link-image' alt='Logo' />
            <span className='navigation__link-text'>
              Аккаунт
            </span>
          </NavLink>
        </div>
      ) :
      (
        <div className='navigation__sign-links'>
          <NavLink to='/sign-up' className='link-animation navigation__signup'>Регистрация</NavLink>
          <NavLink to='/sign-in' className='link-animation navigation__signin-button'>Войти</NavLink>
        </div>
      )
    }
    </div>
  );
}

export default Navigation;