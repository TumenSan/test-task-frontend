import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NewsModel } from "./components/Models/NewsModel";
import { CommentModel } from "./components/Models/CommentModel";
import { NewsPage } from "./components/NewsPage";
import { NewsList } from './components/NewsList';
import { Container, Header, Menu, Message, Segment } from "semantic-ui-react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header as="h1" attached="top">
        Hacker news
      </Header>
      <Router>
        <Switch>
          <Route exact path="/">
            <NewsList />
          </Route>
          <Route path="/news/:id">
            <NewsPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
