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

// Создадим компонент для отображения комментария
export const Comment = ({ comment }) => {
  const [expanded, setExpanded] = useState(false);
  const [replyExist, setReplyExist] = useState(false);
  const [Comments, setComments] = useState([]);

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

  const toggleReplies = () => {
    setExpanded(!expanded);
  };

  async function fetchComments(Comments){
    Comments.forEach(async (CommentId, index) => {
      let comment = await fetchSingleComment(CommentId);
      console.log('1:23 ', comment);
      setComments((e) => [...e, comment]);
    });
  }

  useEffect(() => {
    if (comment?.kids && comment.kids.length > 0) {
      fetchComments(comment.kids);
    }
  }, [])

  return (
    <div>
      <div>
        <p dangerouslySetInnerHTML={{ __html: comment?.text }}></p>
        <p>{comment?.by}</p>
        <p>{comment?.time}</p>
        {comment.hasOwnProperty("kids") && Array.isArray(comment.kids) && comment.kids.length > 0 && (
          <button
            type="button"
            onClick={() => toggleReplies()}
          >

            {expanded ? "Скрыть ответы" : "Показать ответы"}
          </button>
        )}
        {expanded &&
          comment?.kids.map((reply, index) => (
            <div key={index} style={{ marginLeft: "20px" }}>
              <Comment comment={reply} />
            </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;