import React, { useEffect, useState } from "react";
import Card from "./Card";


export const CardList = ({cards, setCards, deckId}) => {
  const list = cards.map((card) => <Card key={card.id} card={card} />);

  return (
    <div>
      <section className="col">{list}</section>
    </div>
  );
};

export default CardList;