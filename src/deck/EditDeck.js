import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";
import DeckForm from "./DeckForm";

function EditDeck() {
  
  const [deck, setDeck] = useState({})
  const [error, setError] = useState(undefined);
  const { deckId } = useParams(); 

  useEffect(() => {
    const abortController = new AbortController();

    readDeck( deckId, abortController.signal).then(setDeck).catch(setError);

    return () => abortController.abort();
  }, [deckId]);


  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (deck.id) {
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
          </ol>
        </nav>
        <h1>Edit Deck</h1>
        <DeckForm initFormState={deck} submitType={"edit"} />
      </div>
    )
  } else {
    return (<p>Loading...</p>)
  }
} 

export default EditDeck