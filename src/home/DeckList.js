import React, { useEffect, useState } from "react";
import DeckDisplay from "./DeckDisplay";

import { listDecks } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";

export const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDecks).catch(setError);

    return () => abortController.abort();
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const list = decks.map((deck) => <DeckDisplay key={deck.id} deck={deck} />);

  return (
    <main className="container">
      <section className="col">{list}</section>
    </main>
  );
};

export default DeckList;
