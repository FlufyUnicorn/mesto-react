import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext)

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name,
      about: description,
    })
  }
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  return (
    <PopupWithForm
      id={'profile'}
      title={'Редактировать профиль'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input id="name-input"
               type="text"
               className="popup__input"
               name="name"
               placeholder="Ваше Имя"
               minLength="2"
               maxLength="40"
               required
               onChange={handleChangeName}
        />
        <span className="name-input-error popup__input-error-text"/>
      </label>
      <label className="popup__label">
        <input id="job-input"
               type="text"
               className="popup__input"
               name="about"
               placeholder="Место работы"
               minLength="2"
               maxLength="200"
               required
               onChange={handleChangeDescription}/>
        <span className="job-input-error popup__input-error-text"/>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;