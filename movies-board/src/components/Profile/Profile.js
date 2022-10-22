import Header from "../Header/Header";

function Profile(props) {
  return (
    <>
      <Header />
      <section className='profile'>
        <h1 className='profile__header'>Привет, Виталий!</h1>
        <div className='profile__input-container'>
          <label className='profile__input-label'>Имя</label>
          <input type='text' className='profile__input profile__input_type_name' />
        </div>
        <div className='profile__input-container'>
          <label className='profile__input-label'>E-mail</label>
          <input type='text' className='profile__input profile__input_type_email' />
        </div>
        <p className='profile__edit profile__link'>Редактировать</p>
        <p className='profile__exit profile__link'>Выйти из аккаунта</p>
      </section>
    </>
  );
}

export default Profile;