import React from "react";
import DeckDisplay from "./DeckDisplay";


export const DeckList = ({decks, setDecks}) => {
  const list = decks.map((deck) => <DeckDisplay key={deck.id} deck={deck} setDecks={setDecks} />);

  return (
    <div>
      <section className="col">{list}</section>
    </div>
  );
};

export default DeckList;
