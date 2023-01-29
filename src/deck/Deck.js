import React, { useEffect, useState } from "react";
import { useParams, Link, useRouteMatch, Switch, Route } from "react-router-dom";
import { readDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";

function Deck() {
  const [deck, setDeck] = useState({ cards: [] });
  const [error, setError] = useState(undefined);
  const { deckId } = useParams(); 
  const { path, url } = useRouteMatch();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return (
      <ErrorMessage error={error}>
        <p>
          <Link to={"/"}>Return Home</Link>;
        </p>
      </ErrorMessage>
    );
  }

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
    </div>
  )
}

export default Deck