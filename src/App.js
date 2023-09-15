import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import { NewsPage } from "./components/NewsPage";
//import { NewsList } from './components/NewsList';
import { Container, Header, Menu, Message, Segment } from "semantic-ui-react";
import { makeObservable, observable, computed, action, flow, runInAction } from "mobx";
import newsState from "./state/NewsState";
import "./App.css";

const NewsList = lazy(() => import("./components/NewsList"));
const NewsPage = lazy(() => import("./components/NewsPage"));

function App() {
  return (
    <Router>
      <div className="App">
        <Header as="h1" attached="top">
          Hacker news
          <button
            type="button"
            onClick={() => newsState.fetchLast100News()}
          >
            Refresh
          </button>
        </Header>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/">
                <NewsList />
              </Route>
              <Route path="/news/:id">
                <NewsPage />
              </Route>
            </Switch>
          </Suspense>
      </div>
    </Router>
  );
}

export default App;
