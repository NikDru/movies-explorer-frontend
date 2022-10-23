function AboutProject(props) {
  return (
    <section className='project'>
      <h2 className='project__header section-header'>О проекте</h2>
      <ul className='project__list'>
        <li className='project__element'>
          <h3 className='project__presentation-header'>Дипломный проект включал 5 этапов</h3>
          <p className='project__presentation-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='project__element'>
          <h3 className='project__presentation-header'>На выполнение диплома ушло 5 недель</h3>
          <p className='project__presentation-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className='project__chart'>
        <p className='project__chart-element'>1 неделя</p>
        <p className='project__chart-element project__chart-element_color_gray'>4 недели</p>
        <p className='project__chart-sign'>Back-end</p>
        <p className='project__chart-sign'>Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;