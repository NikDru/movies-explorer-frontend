import React, { useContext } from 'react';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';
import useWindowSize from '../../userHooks/useWindowSize';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function Header(props) {

  const currentUser = useContext(CurrentUserContext);

  const [width, height] = useWindowSize();

  return (
    <header className={`header ${props.fontStyle === 'white' ? 'header_color_white' : ''}`}>
      <div className='header__navigation'>
        <NavLink className='header__link' to='/'>
          <img src={logo} alt='Logo' className='header__logo'/>
        </NavLink>
        {
          width > 768 ?
            <Navigation signedIn={currentUser.loggedIn} styleElements={props.fontStyle} sideMenu={false}/> :
            <Navigation signedIn={currentUser.loggedIn} styleElements={props.fontStyle} sideMenuButton={true} onSideMenuClick={props.onSideMenuClick}/>
        }
      </div>
    </header>
  );
}

export default Header;