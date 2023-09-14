import { observable } from 'mobx';

const newsState = observable({
  ListNews: [],
  SingleNews: {},
  Comments: [],
  NewsListIsLoading: true
});
/*
class NewsState {
  ListNews = [];
  SingleNews = {};
  Comments = [];
  NewsListIsLoading = true;

  addNews(news) {
    this.ListNews.push(news);
  }

  setSingleNews(singleNews) {
    this.SingleNews = singleNews;
  }

  setLoading(loading) {
    this.isLoading = loading;
  }

  addComment(comment) {
    this.Comments.push(comment);
  }
}

const newsState = new NewsState();
*/
export default newsState;