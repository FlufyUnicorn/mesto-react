import React from "react";

function Card(props) {
  return (
    <li className="card" key={props.key}>
      <button className="card__delete-button" type="button"/>
      <img className="card__image" src={props.image} alt={props.title} onClick={()=>props.onCardClick(props.card)}/>
      <div className="card__info">
        <h2 className="card__name">{props.title}</h2>
        <div className="card__like-container">
          <button className="card__like-button" type="button"/>
          <p className="card__like-counter">{props.likeCounter}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;