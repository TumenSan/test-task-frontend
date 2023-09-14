//import './NewsPage.css';
import { NewsModel } from "./Models/NewsModel";
import { CommentModel } from "./Models/CommentModel";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, Header, Menu, Message, Segment } from "semantic-ui-react";
import { observer } from 'mobx-react-lite';
import newsState from "../state/NewsState";

// Создадим компонент для отображения новости
export const NewsPage = observer(() => {
  const [SingleNews, setSingleNews] = useState();
  const params = useParams();

  useEffect(() => {
    console.log(params.id);
    console.log(newsState.ListNews[0]);
    console.log(newsState.ListNews.find(e => e.id === params.id));
    setSingleNews(newsState.ListNews.find(e => e.id === params.id));
  }, [params]);

  return (
    <div>
      <div className="SingleNews">
        <a href={SingleNews?.url}>{SingleNews?.url}</a>
        <p>{SingleNews?.title}</p>
        <p>Date: {SingleNews?.time}</p>
        <p>Author: {SingleNews?.by}</p>
        
      </div>
    </div>
  );
})

export default NewsPage;