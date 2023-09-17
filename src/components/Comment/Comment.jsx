//import './NewsPage.css';
import { CommentModel } from "../Models/CommentModel";
import React, { useState, useEffect } from "react";
import { Container, Button, Segment } from "semantic-ui-react";

// Создадим компонент для отображения комментария
export const Comment = ({ comment }) => {
  const [expanded, setExpanded] = useState(false);
  const [Comments, setComments] = useState([]);
  const [GoodComment, setGoodComment] = useState(false);

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
      else return (false);
    } catch (error) {
      console.log(error);
      return (false);
    }
  }

  const toggleReplies = () => {
    setExpanded(!expanded);
  };

  async function fetchComments(Comments){
    Comments.forEach(async (CommentId, index) => {
      let comment = await fetchSingleComment(CommentId);
      if (typeof comment !== 'undefined')
        setComments((e) => [...e, comment]);
    });
  }

  useEffect(() => {
    if ((comment.hasOwnProperty("by")) && (comment.hasOwnProperty("text")) && (comment.hasOwnProperty("time")))
      setGoodComment(true);
    if (comment?.kids && comment.kids.length > 0) {
      fetchComments(comment.kids);
    }
  }, [])

  return (
    <div>
      {GoodComment && (
        <Container style={{ paddingBottom: '20px' }}>
          <Segment attached>
            <p>By: {comment?.by}</p>
            <p dangerouslySetInnerHTML={{ __html: comment?.text }}></p>
            <p>{comment?.time}</p>
          </Segment>
          {comment.hasOwnProperty("kids") && Array.isArray(comment.kids) && comment.kids.length > 0 && (
            <Segment attached>
              <Button
                type="button"
                onClick={() => toggleReplies()}
              >

                {expanded ? "Close replies" : "Open replies"}
              </Button>
            </Segment>
          )}
          {expanded &&
            Comments.map((reply, index) => (
              <Segment attached>
                <div key={index} style={{ marginLeft: "20px" }}>
                  <Comment comment={reply} />
                </div>
              </Segment>
          ))}
        </Container >
      )}
    </div>
  );
}

export default Comment;