import React, { useEffect, useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../home/DeckList";
import CreateDeckBtn from "./CreateDeckBtn";
import CreateNewDeck from "../deck/CreateNewDeck";
import { listDecks } from "../utils/api";
import ErrorMessage from "./ErrorMessage";
import Deck from "../deck/Deck";

function Layout() {
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
  
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <CreateDeckBtn />
            <DeckList decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/new">
            <CreateNewDeck setDecks={setDecks} />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        
      </div>
    </>
  );
}

export default Layout;
