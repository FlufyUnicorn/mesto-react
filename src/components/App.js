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
        <PopupWithForm id={'profile'} title={'Редактировать профиль'} isOpen={isEditProfilePopupOpen}
                       onClose={closeAllPopups}/>
        <PopupWithForm id={'place'} title={'Новое место'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
        <ImagePopup isOpen={isImageOpen} onClose={closeAllPopups} card={selectedCard}/>
        <PopupWithForm id={'delete'} title={'Вы уверены?'} isOpen={false} onClose={closeAllPopups}/>
        <PopupWithForm id={'avatar'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
      </div>
    </div>
  );
}

export default App;
