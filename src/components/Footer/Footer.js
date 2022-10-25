function Footer(props) {
  return (
    <footer className='footer'>
      <h2 className='footer__header'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__content'>
        <p className='footer__date'>&copy; 2022</p>
        <div className='footer__links'>
          <a className='link-animation footer__link' href='https://practicum.yandex.ru' target='blank'>Яндекс.Практикум</a>
          <a className='link-animation footer__link' href='https://github.com' target='blank'>Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;