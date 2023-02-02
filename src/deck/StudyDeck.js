import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { deleteDeck, listDecks, readDeck } from "../utils/api";
import StudyCard from "../card/StudyCard";
import ErrorMessage from "../Layout/ErrorMessage";

function StudyDeck () {
  const [deck, setDeck] = useState({ cards: [] });
  const [error, setError] = useState(undefined);
  const [cards, setCards] = useState([])
  const { deckId } = useParams(); 

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();
    setCards(deck.cards)

    return () => abortController.abort();
  }, [deck.cards.length]);

  if (error) {
    return (
      <ErrorMessage error={error}>
        <p>
          <Link to={"/"}>Return Home</Link>;
        </p>
      </ErrorMessage>
    );
  }

  if (deck.id) {
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Study</li>
          </ol>
        </nav>
        <h1>{deck.name}: Study</h1>
        <StudyCard cards={cards} />
      </div>
    )
  } else {
    return <p>Loading...</p>
  }
}

export default StudyDeck