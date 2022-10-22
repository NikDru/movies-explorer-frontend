import arrow from '../../../images/link_arrow.svg';

function Portfolio(props) {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__header'>Портфолио</h3>
      <a className='link-animation portfolio__link' href='https://nikdru.github.io/russian-travel/' target='blank'>
        <p className='portfolio__link-text'>Статичный сайт</p>
        <img className='portfolio__link-image' src={arrow} alt='Arrow'/>
      </a>
      <a className='link-animation portfolio__link' href='https://github.com/NikDru/russian-travel' target='blank'>
        <p className='portfolio__link-text'>Адаптивный сайт</p>
        <img className='portfolio__link-image' src={arrow} alt='Arrow'/>
      </a>
      <a className='link-animation portfolio__link' href='https://github.com/NikDru/react-mesto-api-full' target='blank'>
        <p className='portfolio__link-text'>Одностраничное приложение</p>
        <img className='portfolio__link-image' src={arrow} alt='Arrow'/>
      </a>
    </section>
  );
}

export default Portfolio;