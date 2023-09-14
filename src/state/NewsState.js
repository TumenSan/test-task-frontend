import { observable, action, makeObservable } from 'mobx';

class NewsState {
  ListNews = [];
  SingleNews = {};
  Comments = [];

  constructor() {
    makeObservable(this, {
      ListNews: observable,
      SingleNews: observable,
      Comments: observable,
      addNews: action,
      setSingleNews: action,
      addComment: action,
    });
  }

  addNews(news) {
    this.ListNews.push(news);
  }

  setSingleNews(singleNews) {
    this.SingleNews = singleNews;
  }

  addComment(comment) {
    this.Comments.push(comment);
  }
}

const newsState = new NewsState();
export default newsState;