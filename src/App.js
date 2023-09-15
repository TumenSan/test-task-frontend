import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { NewsPage } from "./components/NewsPage";
import { NewsList } from './components/NewsList';
import { Container, Header, Menu, Message, Segment } from "semantic-ui-react";
import newsState from "./state/NewsState";
import "./App.css";

function App() {
  useEffect(() => {
    newsState.fetchLast100News();

    // Установка интервала для обновления каждую минуту (60,000 миллисекунд)
    const intervalId = setInterval(() => {
      newsState.fetchLast100News();
    }, 60000);

    // Очистка интервала при размонтировании компонента
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
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
      <Switch>
        <Route exact path="/">
          <NewsList />
        </Route>
        <Route path="/news/:id">
          <NewsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
