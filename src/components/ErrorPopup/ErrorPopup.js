import React from 'react';

function ErrorPopup(props) {

  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}
      onClick={(e) => props.onClose(e)}>
    <div className="popup__container popup__container_type_tooltip">
      <button type="button" className="popup__close-button" aria-label="Close"></button>
      <div className="popup__info-form">
        <h2 className="popup__header">{`Что-то пошло не так! Попробуйте еще раз. Ошибка: ${props.errorMessage}`}</h2>
      </div>
    </div>
  </div>
  );
}

export default ErrorPopup;