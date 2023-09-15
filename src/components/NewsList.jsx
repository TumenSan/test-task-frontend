import './NewsList.css'
import { NewsModel } from "./Models/NewsModel";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import { Link } from "react-router-dom";
import { Container, Header, Menu, Message, Segment } from "semantic-ui-react";
import newsState from "../state/NewsState";

// Компонент для отображения списка новостей
export const NewsList = observer(() => {
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
    <div className="news-list">
      {newsState.ListNews?.map((News, i) => (
        <div className="news-item" key={i}>
          {i+1}.
          <Link to={`/news/${News?.id}`}>{News?.title}</Link>
          <p>{News?.score} points by {News?.by}</p>
          <p>Date: {News?.time}</p>
        </div>
      ))}
    </div>
  );
})

export default NewsList;