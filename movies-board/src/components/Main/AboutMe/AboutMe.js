import photo from '../../../images/photo_main.png';

function AboutMe(props) {
  return (
    <>
      <h2>Студент</h2>
      <h3>Виталий</h3>
      <h4>Фронтенд-разработчик, 30 лет</h4>
      <p>Я родился и живу в Саратове, закончил факультет экономики СГУ.
      У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
      Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
      После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
      <p>Github</p>
      <img src={photo} alt='My Photo'/>
    </>
  );
}

export default AboutMe;