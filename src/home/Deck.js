import React from "react";
import { useHistory, Link } from "react-router-dom";

/*
  TODO: Change the link below to go to the user route, using the user's ID.
  /users/:userId
*/

export const Deck = ({ deck = { cards: [] } }) => (
  <article className="col-12 col-md-6 col-xl-3 my-2 align-self-stretch">
    <div className="border p-4 h-100 d-flex flex-column">
      <h2 className="font-weight-lighter flex-fill">
        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
      </h2>
      <Link to={`/decks/${deck.id}/cards`} className="mt-2">Cards »</Link>
    </div>
  </article>
);

export default Deck;

// <Link to={"/"}>Go Home</Link>;