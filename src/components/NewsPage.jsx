//import './NewsPage.css';
import { NewsModel } from "./Models/NewsModel";
import { CommentModel } from "./Models/CommentModel";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Menu, Message, Segment } from "semantic-ui-react";
import { observer } from 'mobx-react';
import newsState from "../state/NewsState";

// Создадим компонент для отображения новости
export const NewsPage = observer(() => {
  const [singleNews, setSingleNews] = useState(null);
  const params = useParams();

  //console.log(newsState.ListNews[2]);
  //newsState.clgNews();

  useEffect(() => {
    console.log(newsState.ListNews);
    console.log(newsState.NewsListIsLoading);
    const foundSingleNews = newsState.getSingleNews(params.id);
    console.log(foundSingleNews);
    setSingleNews(foundSingleNews);
  }, [params.id]);

  return (
    <div>
      <Link to="/">Go back</Link>
      <div className="SingleNews">
        {singleNews && (
          <>
            <a href={singleNews.url}>{singleNews.url}</a>
            <p>{singleNews.title}</p>
            <p>{singleNews.time}</p>
            <p>Author: {singleNews.by}</p>
          </>
        )}
        
      </div>
    </div>
  );
})

export default NewsPage;