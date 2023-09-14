import { NewsModel } from "./Models/NewsModel";
import React, { useState, useEffect } from "react";
import { Container, Header, Menu, Message, Segment } from "semantic-ui-react";

// Создадим компонент для отображения списка новостей
export const NewsList = () => {
  const [UseStateNews, setUseStateNews] = useState([]);

  // Находим последние новости
  function fetchLastIDNews() {
    return fetch(`http://localhost:5000/api/lastnews`).then((response) =>
      response.json()
    );
  }

  // Функция для обработки 100 новостей
  async function fetchLast100News() {
    let Last100Id = await fetchLastIDNews();
    console.log(Last100Id, " Last100Id");
    Last100Id.forEach(async (NewsId, index) => {
      try {
        let response = await fetch(`http://localhost:5000/api/news/${NewsId}`);
        const data = await response.json();
        if (!data.hasOwnProperty("error"))
          if (data.type === "story") {
            console.log(data);
            setUseStateNews((UseStateNews) => [
              ...UseStateNews,
              new NewsModel(
                data.id,
                data.descendants,
                data.by,
                data.kids,
                data.score,
                data.time,
                data.type,
                data.title,
                data.url
              ),
            ]);
          }
      } catch (error) {
        console.log(error);
      }
    });
  }

  useEffect(() => {
    //fetchSingleNews(1);
    //console.log(fetchLastItemId());
    fetchLast100News();
  }, []);

  return (
    <div>
      {UseStateNews?.map((News, i) => (
        <div className="News" key={i}>
          <a href={News.url}>{News.title}</a>
          <p>Rating: {News.score}</p>
          <p>Author: {News.by}</p>
          <p>Date: {News.time}</p>
        </div>
      ))}
    </div>
  );
}

export default NewsList;