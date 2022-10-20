function Techs(props) {
  return (
    <section className='techs'>
      <h2 className='techs__header section-header'>Технологии</h2>
      <h3 className='techs__title'>7 технологий</h3>
      <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className='techs__technology-list'>
        <p className='techs__technology'>HTML</p>
        <p className='techs__technology'>CSS</p>
        <p className='techs__technology'>JS</p>
        <p className='techs__technology'>React</p>
        <p className='techs__technology'>Git</p>
        <p className='techs__technology'>Express.js</p>
        <p className='techs__technology'>mongoDB</p>
      </div>
    </section>
  );
}

export default Techs;