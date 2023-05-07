import React from "react";
import {api} from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserName(res.name)
        setUserDescription(res.about)
        setUserAvatar(res.avatar)
      })
      .catch(console.log)
  }, [userName, userDescription, userAvatar])

  React.useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch(console.log)
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-img" src={userAvatar} alt={userName} onClick={props.onEditAvatar}/>
        </div>
        <h1 className="profile__name">{userName}</h1>
        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}/>
        <p className="profile__job">{userDescription}</p>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}/>
      </section>
      <section className="elements">
        <ul className="cards">
          {
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                title={card.name}
                likeCounter={card.likes.length}
                image={card.link}
                onCardClick={props.onCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;