//import './NewsPage.css';
import { CommentModel } from "../Models/CommentModel";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Segment } from "semantic-ui-react";
import { observer } from 'mobx-react';
import newsState from "../../state/NewsState";
import { Comment } from "../Comment/Comment";

// Создадим компонент для отображения новости
export const NewsPage = observer(() => {
  const [singleNews, setSingleNews] = useState(null);
  const [CountComments, setCountComments] = useState(0);
  const [Comments, setComments] = useState([]);
  const params = useParams();

  const history = useHistory();
  
  const handleClick = () => {
    history.goBack();
  };

  // Функция для обработки комментария
  async function fetchSingleComment(CommentId) {
    try {
      let response = await fetch(`http://localhost:5000/api/comment/${CommentId}`);
      const data = await response.json();
      if (!data.hasOwnProperty("error"))
        if (data.type === "comment") {
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
      let comment = await fetchSingleComment(CommentId);
      console.log(comment);
      if (typeof comment !== 'undefined')
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
  }, [params.id]);

  return (
    <div>
      <Button
        type="button"
        onClick={() => handleClick()}
      >
        Go back
      </Button>
      <div className="SingleNews">
        {singleNews && (
          <Container>
            <Segment attached>
              <a href={singleNews?.url}>{singleNews?.url}</a>
            </Segment>
            <Segment attached style={{ marginBottom: '20px' }}>
              <h3>{singleNews?.title}</h3>
              <p>{singleNews?.time}</p>
              <p>Author: {singleNews?.by}</p>
              <p>Replies: {CountComments}</p>
            </Segment>
            {Comments?.map((SingleComment, i) => (
              <div key={i}>
                <Comment
                  comment={SingleComment}
                />
              </div>
            ))}
          </Container>
        )}
        
      </div>
    </div>
  );
})

export default NewsPage;