//import './NewsPage.css';
import { NewsModel } from "./Models/NewsModel";
import { CommentModel } from "./Models/CommentModel";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, Header, Menu, Message, Segment } from "semantic-ui-react";
import { observer } from 'mobx-react';
import newsState from "../state/NewsState";

// Создадим компонент для отображения новости
export const NewsPage = observer(() => {
  const [singleNews, setSingleNews] = useState(null);
  const params = useParams();

  console.log(newsState.ListNews[2]);
    
  const foundSingleNews = newsState.ListNews.find((e) => e.id === params.id);
  if (foundSingleNews) {
    setSingleNews(foundSingleNews);
  }

  return (
    <div>
      <a href="/">Go back</a>
      <div className="SingleNews">
        <a href={singleNews?.url}>{singleNews?.url}</a>
        <p>{singleNews?.title}</p>
        <p>Date: {singleNews?.time}</p>
        <p>Author: {singleNews?.by}</p>
        
      </div>
    </div>
  );
})

export default NewsPage;