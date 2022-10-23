import photo from '../../../images/photo_main.png';

function AboutMe(props) {
  return (
    <section className='me'>
      <h2 className='me__header section-header'>Студент</h2>
      <div className='me__info'>
        <div className='me__text-block'>
          <h3 className='me__name'>Виталий</h3>
          <h4 className='me__job'>Фронтенд-разработчик, 30 лет</h4>
          <p className='me__small'>Я родился и живу в Саратове, закончил факультет экономики СГУ.
          У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className='link-animation me__github-link' href='https://github.com/NikDru' target='blank'>Github</a>
        </div>
{/*         <img className='me__photo' src={photo} alt='Me'/> */}
      </div>
    </section>
  );
}

export default AboutMe;