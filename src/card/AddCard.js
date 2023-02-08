import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const initFormState = {
    front: "Front side of card",
    back: "Back side of card"
  }
  
  const [formData, setFormData] = useState({ ...initFormState })
  const [newCard, setNewCard] = useState({})
  const [deck, setDeck] = useState({})
  const history = useHistory();
  const { deckId } = useParams(); 

  useEffect(() => {
    readDeck(deckId).then(setDeck)
  }, [])

  const handleSave = async (event) => {
    event.preventDefault();
    await createCard(deckId, formData).then(setNewCard)
    setFormData({ ...initFormState });
  };

  const handleDone  = async (event) => {
    event.preventDefault();
    await createCard(deckId, formData).then(setNewCard)
    history.push(`/decks/${deckId}`)
  }


  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>
      <h3>{deck.name}: Add Card</h3>
      <CardForm formData={formData} setFormData={setFormData} />
      <button onClick={handleDone} className="btn btn-secondary mx-2">Done</button>
      <button onClick={handleSave} className="btn btn-primary">Save</button>
    </div>
  )
}

export default AddCard