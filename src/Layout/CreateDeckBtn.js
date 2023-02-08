import React from "react";
import { Link } from "react-router-dom";

function CreateDeckBtn() {
  return (
    <div className="container">
      <Link to={`/decks/new`} className="btn btn-secondary">Create Deck</Link>
    </div>
  )
}

export default CreateDeckBtn