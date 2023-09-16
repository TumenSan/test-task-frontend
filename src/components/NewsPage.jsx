//import './NewsPage.css';
import { NewsModel } from "./Models/NewsModel";
import { CommentModel } from "./Models/CommentModel";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Menu, Message, Segment } from "semantic-ui-react";
import { observer } from 'mobx-react';
import newsState from "../state/NewsState";
import commentState from "../state/CommentState";
import { Comment } from "./Comment";

// Создадим компонент для отображения новости
export const NewsPage = observer(() => {
  const [singleNews, setSingleNews] = useState(null);
  const [CountComments, setCountComments] = useState(0);
  const [Comments, setComments] = useState([]);
  const params = useParams();

  // Функция для обработки комментария
  async function fetchSingleComment(CommentId) {
    try {
      let response = await fetch(`http://localhost:5000/api/comment/${CommentId}`);
      const data = await response.json();
      if (!data.hasOwnProperty("error"))
        if (data.type === "comment") {
          console.log(data);
          let CommentNewsDate = new Date(data?.time * 1000).toLocaleString(undefined, { hour: 'numeric', minute: 'numeric' });
          let comment = new CommentModel(
            data.id,
            data.by,
            data.kids,
            data.text,
            data.parent,
            CommentNewsDate,
            data.type
          );
          return(comment);
        }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchComments(Comments){
    Comments.forEach(async (CommentId, index) => {
      console.log(1);
      let comment = await fetchSingleComment(CommentId);
      console.log(comment);
      setComments((e) => [...e, comment]);
    });
  }

  useEffect(() => {
    console.log(newsState.ListNews);
    console.log(newsState.NewsListIsLoading);
    const foundSingleNews = newsState.getSingleNews(params.id);
    setCountComments(foundSingleNews.kids?.length || 0);
    console.log(foundSingleNews);
    setSingleNews(foundSingleNews);
    if (foundSingleNews?.kids && foundSingleNews.kids.length > 0) {
      fetchComments(foundSingleNews.kids);
    }

    //CommentState.fetchComments();
    //GetComments(foundOne);
  }, [params.id]);

  return (
    <div>
      <Link to="/">Go back</Link>
      <div className="SingleNews">
        {singleNews && (
          <>
            <a href={singleNews?.url}>{singleNews?.url}</a>
            <p>{singleNews?.title}</p>
            <p>{singleNews?.time}</p>
            <p>Author: {singleNews?.by}</p>
            <p>Comments: {CountComments}</p>
            {Comments?.map((SingleComment, i) => (
              <div key={i}>
                <Comment
                  comment={SingleComment}
                />
              </div>
            ))}
          </>
        )}
        
      </div>
    </div>
  );
})

export default NewsPage;