import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";
import CardForm from "./CardForm";

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
      <h1>Edit Card</h1>
      <CardForm formData={formData} setFormData={setFormData} />
      <Link to={`/decks/${deckId}`} className="btn btn-secondary mx-2">Cancel</Link>
      <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
    </div>
  )
}

export default EditCard