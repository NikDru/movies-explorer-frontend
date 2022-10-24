import React from 'react';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';
import { useLocation, NavLink } from 'react-router-dom';
import useWindowSize from '../../userHooks/useWindowSize';

function Header(props) {
  const [width, height] = useWindowSize();

  return (
    <header className={`header ${props.style === 'white' ? 'header_color_white' : ''}`}>
      <div className='header__navigation'>
        <NavLink className='header__link' to='/'>
          <img src={logo} alt='Logo' className='header__logo'/>
        </NavLink>
        {
          width > 767 ?
            <Navigation signedIn={props.signedIn} style={props.style} sideMenu={false}/> :
            <Navigation signedIn={props.signedIn} style={props.style} sideMenuButton={true} onSideMenuClick={props.onSideMenuClick}/>
        }
      </div>
    </header>
  );
}

export default Header;