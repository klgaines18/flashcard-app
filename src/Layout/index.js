import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../home/DeckList";
import CreateDeckBtn from "./CreateDeckBtn";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <CreateDeckBtn />
            <DeckList />
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
