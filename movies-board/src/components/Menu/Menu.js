import logo from '../../images/logo.svg';
import { useLocation, NavLink } from 'react-router-dom';
import account from '../../images/account.svg';
import account_white from '../../images/account_white.svg';
import Navigation from '../Navigation/Navigation';

function Menu(props) {
  return (
    <div className='menu menu_opened'>
      <div className='menu__container'>
        <button className='menu__close-button'></button>
        <Navigation signedIn='true' main='true' style={props.style}/>
      </div>
    </div>
  );
}

export default Menu;