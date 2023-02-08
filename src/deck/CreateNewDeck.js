import React from "react";
import { Link } from "react-router-dom";
import DeckForm from "./DeckForm";

function CreateNewDeck() {
  const initFormState = {
    name: "Deck Name",
    description: "Brief description of the deck"
  }

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <DeckForm initFormState={initFormState} submitType={"create"} />
    </div>
  )
}

export default CreateNewDeck