import earthWebImage from '../../../images/earth_web.svg';

function Promo(props) {
  return (
      <section className='promo'>
        <div className='promo__main'>
          <div className='promo__text'>
            <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
            <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          </div>
          <img className='promo__logo' src={earthWebImage} alt='Earth'/>
        </div>
        <button className='button-animation promo__add-info-button'>Узнать больше</button>
      </section>
  );
}

export default Promo;