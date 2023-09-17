import "./NewsList.css";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import newsState from "../../state/NewsState";

// Компонент для отображения списка новостей
export const NewsList = observer(() => {
  return (
    <div className="news-list">
      {newsState.ListNews?.map((News, i) => (
        <div className="news-item" key={i}>
          {i + 1}.<Link to={`/news/${News?.id}`}>{News?.title}</Link>
          <p>
            {News?.score} points by {News?.by}
          </p>
          <p>{News?.time}</p>
        </div>
      ))}
    </div>
  );
});

export default NewsList;
