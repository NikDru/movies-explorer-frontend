import arrow from '../../../images/link_arrow.svg';

function Portfolio(props) {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__header'>Портфолио</h3>
      <ul className='portfolio__links'>
        <li className='portfolio__links-element'>
          <a className='link-animation portfolio__link' target='blank' href='https://nikdru.github.io/russian-travel/'>
            Статичный сайт
            <img className='portfolio__link-image' src={arrow} alt='Arrow'/>
          </a>

        </li>
        <li className='portfolio__links-element'>
          <a className='link-animation portfolio__link' href='https://github.com/NikDru/russian-travel' target='blank'>
            Адаптивный сайт
            <img className='portfolio__link-image' src={arrow} alt='Arrow'/>
          </a>

        </li>
        <li className='portfolio__links-element'>
          <a className='link-animation portfolio__link' href='https://github.com/NikDru/react-mesto-api-full' target='blank'>
            Одностраничное приложение
            <img className='portfolio__link-image' src={arrow} alt='Arrow'/>
          </a>

        </li>
      </ul>
    </section>
  );
}

export default Portfolio;