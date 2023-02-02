import React from "react";
import { useParams, Link } from "react-router-dom";

function StudyCard({cards}) {
  const { deckId } = useParams(); 

  if (cards.length < 3) {
    return (
      <div>
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mx-2">Add Cards</Link>
      </div>
    )
  }

  return (
    <div>
      <p>start here</p>
    </div>
  )

}

export default StudyCard