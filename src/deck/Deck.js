import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteDeck, listDecks, readDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";
import CardList from "../card/CardList";

function Deck( { setDecks } ) {
  const [deck, setDeck] = useState({ cards: [] });
  const [error, setError] = useState(undefined);
  const [cards, setCards] = useState([])
  const { deckId } = useParams(); 
  const { url } = useRouteMatch();
  const history = useHistory();

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

  const handleDelete = async (id) => {
    const result = window.confirm("Delete this deck? You will not be able to recover it.");
    if (result) {
      await deleteDeck(deck.id);
      await listDecks().then(setDecks);
      history.push("/");
    }
  };

  if (deck.id) {
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
          </ol>
        </nav>
        <h4>{deck.name}</h4>
        <p>{deck.description}</p>
        <Link to={`${url}/edit`} className="btn btn-primary mx-2">Edit</Link>
        <Link to={`${url}/study`} className="btn btn-primary mx-2">Study</Link>
        <Link to={`${url}/cards/new`} className="btn btn-primary mx-2">Add Cards</Link>
        <button className="btn btn-danger mx-2" onClick={handleDelete}>
            Delete Deck
        </button>
        <h2 className="mt-3">Cards</h2>
        <CardList cards={cards} />
      </div>
    )
  } else {
    return <p>Loading...</p>
  }
}

export default Deck