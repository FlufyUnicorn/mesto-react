import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isImageOpen, setIsImageOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})

  function handleCardClick(card) {
    setIsImageOpen(true)
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImageOpen(false)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  return (
    <div className="root">
      <div className="page">
        <Header/>
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
        <Footer/>
        <PopupWithForm
          id={'profile'}
          title={'Редактировать профиль'}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input id="name-input" type="text" className="popup__input" name="name" placeholder="Ваше Имя" minLength="2"
                   maxLength="40" required/>
            <span className="name-input-error popup__input-error-text"/>
          </label>
          <label className="popup__label">
            <input id="job-input" type="text" className="popup__input" name="about" placeholder="Место работы"
                   minLength="2" maxLength="200" required/>
            <span className="job-input-error popup__input-error-text"/>
          </label>
        </PopupWithForm>
        <PopupWithForm
          id={'place'}
          title={'Новое место'}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input id="place-input" type="text" className="popup__input" placeholder="Название" name="new_place"
                   required minLength="2" maxLength="30"/>
            <span className="place-input-error popup__input-error-text"/>
          </label>
          <label className="popup__label">
            <input id="url-input" type="url" className="popup__input" placeholder="Ссылка на картинку" name="place_link"
                   required/>
            <span className="url-input-error popup__input-error-text"/>
          </label>
        </PopupWithForm>
        <ImagePopup isOpen={isImageOpen} onClose={closeAllPopups} card={selectedCard}/>
        <PopupWithForm id={'delete'} title={'Вы уверены?'} isOpen={false} onClose={closeAllPopups}/>
        <PopupWithForm
          id={'avatar'}
          title={'Обновить аватар'}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input id="avatar-input" type="url" className="popup__input" placeholder="Ссылка на аватар" name="avatar"
                   required/>
              <span className="avatar-input-error popup__input-error-text"/>
          </label>
        </PopupWithForm>
      </div>
    </div>
);
}

export default App;
