//import './NewsPage.css';
import { NewsModel } from "./Models/NewsModel";
import { CommentModel } from "./Models/CommentModel";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, Header, Menu, Message, Segment } from "semantic-ui-react";

// Создадим компонент для отображения новости
export const NewsPage = () => {
  const [SingleNews, setSingleNews] = useState();
  const params = useParams();

  // Функция для обработки новости
  async function fetchNews() {
    let response = await fetch(`http://localhost:5000/api/news/${params.id}`);
    const data = await response.json();
    if (!data.hasOwnProperty("error"))
      if (data.type === "story") {
        console.log(data);
        setSingleNews((SingleNews) => 
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
          ));
      }
  }

  useEffect(() => {
    fetchNews();
  }, []);

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
}

export default NewsPage;