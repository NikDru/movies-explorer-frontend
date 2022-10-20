import arrow from '../../../images/link_arrow.svg';

function Portfolio(props) {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__header'>Портфолио</h3>
      <div className='portfolio__link'>
        <p className='portfolio__link-text'>Статичный сайт</p>
        <img className='portfolio__link-image' src={arrow} alt='Arrow'/>
      </div>
      <div className='portfolio__link'>
        <p className='portfolio__link-text'>Адаптивный сайт</p>
        <img className='portfolio__link-image' src={arrow} alt='Arrow'/>
      </div>
      <div className='portfolio__link'>
        <p className='portfolio__link-text'>Одностраничное приложение</p>
        <img className='portfolio__link-image' src={arrow} alt='Arrow'/>
      </div>
    </section>
  );
}

export default Portfolio;