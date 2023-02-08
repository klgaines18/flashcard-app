import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../home/DeckList";
import CreateDeckBtn from "./CreateDeckBtn";
import CreateNewDeck from "../deck/CreateNewDeck";
import Deck from "../deck/Deck";
import EditDeck from "../deck/EditDeck";
import EditCard from "../card/EditCard";
import AddCard from "../card/AddCard";
import StudyDeck from "../deck/StudyDeck";

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
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route path="/decks/new">
            <CreateNewDeck />
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
