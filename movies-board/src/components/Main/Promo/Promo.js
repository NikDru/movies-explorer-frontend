import earthWebImage from '../../../images/earth_web.svg';

function Promo(props) {
  return (
    <>
      <h1>Учебный проект студента факультета Веб-разработки.</h1>
      <p>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <img src={earthWebImage} alt='Earth'/>
      <button>Узнать больше</button>
    </>
  );
}

export default Promo;