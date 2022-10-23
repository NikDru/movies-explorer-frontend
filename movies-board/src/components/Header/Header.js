import React from 'react';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';
import { useLocation, NavLink } from 'react-router-dom';

function Header(props) {

  return (
    <header className={`header ${props.style === 'white' && 'header_color_white'}`}>
      <div className='header__navigation'>
        <NavLink className='header__link' to='/'>
          <img src={logo} alt='Logo' className='header__logo'/>
        </NavLink>
        <Navigation signedIn='true'/>
      </div>
    </header>
  );
}

export default Header;