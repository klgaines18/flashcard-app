import React from "react";
import { Link } from "react-router-dom";

export const DeckDisplay = ({ deck = { cards: [] } }) => (
  <article className="card">
    <div className="card-body ">
      <h2 className="card-title">
        {deck.name}
      </h2>
      <h6 class="card-subtitle mb-2 text-muted">Card amount</h6>
      <p className="card-text">{deck.description}</p>
      <a href="#" class="card-link">View</a>
      <a href="#" class="card-link">Study</a>
      <a href="#" class="card-link">Delete</a>
    </div>
  </article>
);

export default DeckDisplay;

