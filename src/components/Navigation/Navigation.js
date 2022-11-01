import React from 'react';
import side_menu_white from '../../images/side_menu.svg';
import side_menu from '../../images/side_menu_white.svg';
import account from '../../images/account.svg';
import account_white from '../../images/account_white.svg';
import { NavLink } from 'react-router-dom';

function Navigation(props) {
  const linkClassName = props.sideMenu === true ? 'navigation__link-right' : 'navigation__link';
  const activeLinkClassName = props.sideMenu === true ? 'navigation__link-right_active' : 'navigation__link_active';

  return (
    <div className='navigation'>
    {
      props.signedIn ? (
          props.sideMenuButton ?
            (
              <img
                className={`button-animation navigation__side-menu ${props.sideMenu === true ? 'navigation__side-menu_right' : ''}`}
                src={props.styleElements === 'white' ? side_menu : side_menu_white}
                alt='Side menu'
                onClick={props.onSideMenuClick}
              />
            ):
            (
              <div className={`navigation__links ${props.sideMenu === true ? 'navigation__links_right' : ''}`}>
                <div className={`navigation__movies-block ${props.sideMenu === true ? 'navigation__movies-block_right' : ''}`}>
                  {
                    props.sideMenu && (
                      <NavLink
                        onClick={props.handleClick}
                        to='/'
                        exact activeClassName={activeLinkClassName}
                        className={`link-animation ${linkClassName} ${props.styleElements === 'white' ? 'navigation__link_color_white' : ''}`}>
                          Главная
                      </NavLink>
                    )
                  }
                  <NavLink
                    onClick={props.handleClick}
                    to='/movies'
                    activeClassName={activeLinkClassName}
                    className={`link-animation ${linkClassName} ${props.styleElements === 'white' ? 'navigation__link_color_white' : ''}`}>
                      Фильмы
                  </NavLink>
                  <NavLink
                    onClick={props.handleClick}
                    to='/saved-movies'
                    activeClassName={activeLinkClassName}
                    className={`link-animation ${linkClassName} ${props.styleElements === 'white' ? 'navigation__link_color_white' : ''}`}>
                      Сохраненные фильмы
                  </NavLink>
                </div>
                <NavLink
                  onClick={props.handleClick}
                  to='/profile'
                  className={`button-animation
                              navigation__profile-link
                              ${props.styleElements === 'white' ? 'navigation__profile-link_color_white' : ''}
                              ${props.sideMenu ? 'navigation__profile-link_right' : ''}
                            `}>
                  <img src={props.styleElements === 'white' ? account : account_white} className='navigation__link-image' alt='Logo' />
                  <span className='navigation__link-text'>
                    Аккаунт
                  </span>
                </NavLink>
              </div>
            )
      )
      :
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