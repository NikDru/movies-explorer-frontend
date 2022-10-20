import React from 'react';
import logo from '../../../images/logo.svg';
import { NavLink } from 'react-router-dom';

function NavTab(props) {
  return (
    <header className="navigation">
      <div>
        <img src={logo} alt="Logo"/>
        <p>Регистрация</p>
        <p>Войти</p>
      </div>
    </header>
  );
}

export default NavTab;