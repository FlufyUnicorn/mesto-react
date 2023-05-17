import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name,
      link: link,
    })
  }
  return (
    <PopupWithForm
      id={'place'}
      title={'Новое место'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input id="place-input"
               type="text"
               className="popup__input"
               placeholder="Название"
               name="new_place"
               required
               minLength="2"
               maxLength="30"
               onChange={handleChangeName}
        />
        <span className="place-input-error popup__input-error-text"/>
      </label>
      <label className="popup__label">
        <input id="url-input"
               type="url"
               className="popup__input"
               placeholder="Ссылка на картинку"
               name="place_link"
               required
               onChange={handleChangeLink}
        />
        <span className="url-input-error popup__input-error-text"/>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;