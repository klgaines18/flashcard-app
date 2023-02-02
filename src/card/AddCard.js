import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readCard, readDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";

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

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
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
      <form onSubmit={handleSubmit} name="createDeck">
        <div className="form-group">
          <label for="front">Front</label>
          <textarea 
            type="text" 
            className="form-control" 
            id="front"
            name="front"
            onChange={handleChange}
            value={formData.front}
            rows="5"
          />
        </div>
        <div className="form-group">
          <label for="back">Back</label>
          <textarea 
            type="text" 
            className="form-control" 
            id="back" 
            name="back"
            onChange={handleChange}
            value={formData.back}
            rows="5"
          />
        </div>
        <button onClick={handleDone} className="btn btn-secondary mx-2">Done</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  )
}

export default AddCard