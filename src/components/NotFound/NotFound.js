import { NavLink } from 'react-router-dom';

function NotFound(props) {
  return (
    <section className='not-found'>
      <h1 className='not-found__header'>404</h1>
      <p className='not-found__text'>Страница не найдена</p>
      <NavLink to='/' className='link-animation not-found__link'>Назад</NavLink>
    </section>
  );
}

export default NotFound;