import React, { useRef, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { NewsPage } from "./components/NewsPage";
import { NewsList } from './components/NewsList';
import { Header, Button } from "semantic-ui-react";
import newsState from "./state/NewsState";
import "./App.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevScrollRef = useRef(null);

  useEffect(() => {
    const prevScroll = prevScrollRef.current;

    if (prevScroll) {
      window.scrollTo(0, prevScroll);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      prevScrollRef.current = window.pageYOffset;
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

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
      </Header>
      <Switch>
        <Route exact path="/">
        <Button
          type="button"
          onClick={() => newsState.fetchLast100News()}
        >
          Update
        </Button>
          <NewsList />
        </Route>
        <Route path="/news/:id">
          <ScrollToTop />
          <NewsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
