import React, { useEffect, useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../home/DeckList";
import CreateDeckBtn from "./CreateDeckBtn";
import CreateNewDeck from "../deck/CreateNewDeck";
import Deck from "../deck/Deck";

function Layout() {
  const [decks, setDecks] = useState([]);

  
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
            <Deck setDecks={setDecks} />
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
