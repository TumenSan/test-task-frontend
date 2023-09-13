import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { makeObservable, observable, action } from 'mobx';
import { NewsModel } from './components/Models/NewsModel';
import { CommentModel } from './components/Models/CommentModel';
import { NewsPage } from './components/NewsPage';
import { Container, Header, Menu, Message, Segment } from 'semantic-ui-react';
import './App.css';

// Создадим хранилище данных
class DataStore {
  MainListNews = []; // Список новостей

  fetchNews() {
    const self = this; // Сохранение ссылки на this

    // Функция для обработки каждой отдельной новости
    function fetchSingleNews(newsCount) {
      return fetch(`https://hacker-news.firebaseio.com/v0/item/${newsCount}.json?print=pretty`)
        .then(response => response.json())
        .then(data => {
          if (data.title === 'story'){
            console.log(data.id);
            self.MainListNews.push(new NewsModel(data.id, data.title, data.rating, data.author, data.date));
          }
          if (newsCount < 100) {
            return fetchSingleNews(newsCount + 1); // Рекурсивный вызов для получения следующей новости
          }
        });
    }

    // Инициализация получения новостей
    fetchSingleNews(0);
  }
}

// Создадим компонент для отображения списка новостей
const NewsList = () => {
  /*
  useEffect(() => {
    // Загрузка новостей при монтировании компонента
    store.fetchNews();

    // Установка интервала обновления новостей каждую минуту
    const interval = setInterval(() => {
      store.fetchNews();
    }, 60000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, store);
  */

  return (
    <div>
      <h1>Latest News</h1>
      <p>Rating: </p>
      <p>Author: </p>
      <p>Date: </p>
    </div>
  );
};


// Создадим экземпляр хранилища данных
//const store = new DataStore();

function App() {
  const [UseStateNews, setUseStateNews] = useState([]);

  // Функция для обработки каждой отдельной новости
  function fetchSingleNews(newsCount) {
    fetch(`http://localhost:5000/api/news/${newsCount}`)
      .then(response => response.json())
      .then(data => {
        if (data.type === 'story'){
          console.log(data);
          setUseStateNews(UseStateNews => [...UseStateNews, (new NewsModel(
            data.id,
            data.descendants,
            data.by,
            data.kids,
            data.score,
            data.time,
            data.type, 
            data.title,  
            data.url
          ))]);
          console.log(UseStateNews[newsCount]);
        }
      });
  }

  // Функция для обработки 100 новостей
  function fetchLastItemId() {
    return fetch(`http://localhost:5000/api/maxitem`)
      .then(response => response.json());
  }

  // Функция для обработки 100 новостей
  async function fetchLast100News() {
    let LastItemId = await fetchLastItemId();
    LastItemId = LastItemId.id;
    console.log(LastItemId, ' LastItemId');
    let NewsCount = 0;
    
    async function fetchNextNews() {
      if (NewsCount < 100) {
        try {
          const response = await fetch(`http://localhost:5000/api/news/${LastItemId}`);
          const data = await response.json();
          
          if (data.type === 'story') {
            console.log(data);
            setUseStateNews(UseStateNews => [...UseStateNews, (new NewsModel(
              data.id,
              data.descendants,
              data.by,
              data.kids,
              data.score,
              data.time,
              data.type, 
              data.title,  
              data.url
            ))]);
            console.log(UseStateNews[NewsCount]);
            NewsCount++;
          }
          
          LastItemId--;
          await fetchNextNews();
        } catch (error) {
          console.log(error);
        }
      }
    }
    
    await fetchNextNews();
  }

  useEffect(() => {
    //fetchSingleNews(1);
    //console.log(fetchLastItemId());
    fetchLast100News();
  }, []);

  return (
    <div className="App">
      <Header as='h1' attached='top'>News</Header>
      <br/>
      {UseStateNews?.map((News, i) => (
        <div className="News" key={i}>
          <a href={News.url}>{News.title}</a>
          <p>Rating: {News.score}</p>
          <p>Author: {News.by}</p>
          <p>Date: {News.time}</p>
        </div>
      ))}
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
