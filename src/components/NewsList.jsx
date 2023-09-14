import './NewsList.css'
import { NewsModel } from "./Models/NewsModel";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { runInAction } from "mobx"
import { Container, Header, Menu, Message, Segment } from "semantic-ui-react";
import newsState from "../state/NewsState";

// Компонент для отображения списка новостей
export const NewsList = observer(() => {

  // Находим последние новости
  function fetchLastIDNews() {
    return fetch(`http://localhost:5000/api/lastnews`).then((response) =>
      response.json()
    );
  }

  // Функция для обработки 100 новостей
  async function fetchLast100News() {
    newsState.ListNews = [];
    let Last100Id = await fetchLastIDNews();
    console.log(Last100Id, " Last100Id");
    Last100Id.forEach(async (NewsId, index) => {
      try {
        let response = await fetch(`http://localhost:5000/api/news/${NewsId}`);
        const data = await response.json();
        if (!data.hasOwnProperty("error"))
          if (data.type === "story") {
            console.log(data);
            runInAction(() => {
              newsState.ListNews.push(
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
                )
              );
              newsState.NewsListIsLoading = false;
            })
          }
      } catch (error) {
        console.log(error);
      }
    });

    console.log(newsState.ListNews);
  }

  useEffect(() => {
    fetchLast100News();

    // Установка интервала для обновления каждую минуту (60,000 миллисекунд)
    const intervalId = setInterval(() => {
      fetchLast100News();
    }, 60000);

    // Очистка интервала при размонтировании компонента
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="news-list">
      {newsState.ListNews?.map((News, i) => (
        <div className="news-item" key={i}>
          {i+1}.
          <a href={`/news/${News?.id}`}>{News?.title}</a>
          <p>{News?.score} points by {News?.by}</p>
          <p>Date: {News?.time}</p>
        </div>
      ))}
    </div>
  );
})

export default NewsList;