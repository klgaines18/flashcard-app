import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";

function EditCard() {
  const [formData, setFormData] = useState({})
  const [updatedCard, setUpdatedCard] = useState({})
  const [deck, setDeck] = useState({})
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const { cardId, deckId } = useParams(); 

  useEffect(() => {
    const abortController = new AbortController();

    readCard( cardId, abortController.signal).then(setFormData).catch(setError);
    

    if (updatedCard.id) {
      history.push(`/decks/${deckId}`)
    }

    return () => abortController.abort();
  }, [updatedCard,]);

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
    await updateCard(formData).then(setUpdatedCard)
  };


  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
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
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mx-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default EditCard