import React from 'react';
import logo from '../../images/logo.svg';
import account from '../../images/account.svg';
import account_white from '../../images/account_white.svg';
import { useLocation, NavLink } from 'react-router-dom';

function Header(props) {

  return (
    <header className={`header ${props.style === 'white' && 'header_color_white'}`}>
      <div className='header__navigation'>
        <NavLink className='header__link' to='/'>
          <img src={logo} alt='Logo' className='header__logo'/>
        </NavLink>
        <div className='header__links'>
        {
          props.signedIn ?
          (
            <>
              <div className='header__movies-links'>
                <NavLink
                  to='/movies'
                  activeClassName="header__link_active"
                  className={`link-animation header__link ${props.style === 'white' && 'header__link_color_white'}`}>
                    Фильмы
                </NavLink>
                <NavLink
                  to='/saved-movies'
                  activeClassName="header__link_active"
                  className={`link-animation header__link ${props.style === 'white' && 'header__link_color_white'}`}>
                    Сохраненные фильмы
                </NavLink>
              </div>
              <NavLink
                to='/profile'
                className={`button-animation header__profile-link ${props.style === 'white' && 'header__profile-link_color_white'}`}>
                <img src={props.style === 'white' ? account : account_white} className='header__link-image' alt='Logo' />
                <span className='header__link-text'>
                  Аккаунт
                </span>
              </NavLink>
            </>
          ) :
          (
            <>
              <NavLink to='/sign-up' className='header__signup'>Регистрация</NavLink>
              <NavLink to='/sign-in' className='header__signin-button'>Регистрация</NavLink>
            </>
          )
        }
        </div>
      </div>
    </header>
  );
}

export default Header;