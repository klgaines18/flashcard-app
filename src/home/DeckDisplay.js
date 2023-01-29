import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

export const DeckDisplay = ({ deck = { cards: [] }, setDecks }) => {
  const history = useHistory();

  const handleDelete = async (id) => {
    const result = window.confirm("Delete this deck? You will not be able to recover it.");
    if (result) {
      await deleteDeck(deck.id);
      await listDecks().then(setDecks);
      history.push("/");
    }
  };

  return (
    <article className="card">
      <div className="card-body ">
        <h2 className="card-title">
          {deck.name}
        </h2>
        <h6 class="card-subtitle mb-2 text-muted">{deck.cards.length} cards</h6>
        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deck.id}`} class="btn btn-primary mx-2">View</Link>
        <Link to={`/decks/${deck.id}/study`} class="btn btn-primary mx-2">Study</Link>
        <button className="btn btn-danger mx-2" onClick={handleDelete}>
            Delete
        </button>
      </div>
    </article>
  )

};

export default DeckDisplay;

