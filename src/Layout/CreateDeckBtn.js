import React from "react";
import { Link } from "react-router-dom";

function CreateDeckBtn() {
  return (
    <div class="container">
      <Link to={`/decks/new`} class="btn btn-secondary">Create Deck</Link>
    </div>
  )
}

export default CreateDeckBtn