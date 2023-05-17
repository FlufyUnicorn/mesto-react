import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {api} from "../utils/Api";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isImageOpen, setIsImageOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => setCurrentUser(res))
      .catch(console.log)
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then(res => setCards(res))
      .catch(console.log)
  }, [])

  function handleCardClick(card) {
    setIsImageOpen(true)
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(console.log)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((arr) => arr.filter((item) => card._id !== item._id))
        closeAllPopups()
      })
      .catch(console.log)
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

  function handleUpdateUser(obj) {
    api.setUserInfo(obj)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
  }

  function handleUpdateAvatar(obj) {
    api.changeAvatar(obj)
      .then(res=>{
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
  }

  function handleAddPlace(obj) {
    console.log(obj, 'obj_card')
    api.addNewCard(obj)
      .then(res=>{
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch(console.log)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header/>
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
          />
          <Footer/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
          <ImagePopup isOpen={isImageOpen} onClose={closeAllPopups} card={selectedCard}/>
          <PopupWithForm id={'delete'} title={'Вы уверены?'} isOpen={false} onClose={closeAllPopups}/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        </div>
      </div>
    </ CurrentUserContext.Provider>
  )
}

export default App;
