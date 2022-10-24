import Navigation from '../Navigation/Navigation';

function Menu(props) {
  return (
    <div className={`menu ${props.isOpen ? 'menu_opened' : ''}`}>
      <div className='menu__container'>
        <button className='button-animation menu__close-button' onClick={props.onSideMenuClose}></button>
        <Navigation signedIn={true} sideMenu={true} style={props.style}/>
      </div>
    </div>
  );
}

export default Menu;