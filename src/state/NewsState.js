import { makeObservable, observable, computed, action, runInAction } from "mobx";
import { NewsModel } from "../components/Models/NewsModel";

class NewsState {
  ListNews = [];
  NewsListIsLoading = true;

  constructor(ListNews, NewsListIsLoading) {
      makeObservable(this, {
          ListNews: observable,
          NewsListIsLoading: observable,
          getListNews: computed,
          getSingleNews: action,
          clgNews: action,
          getNewsListIsLoading: computed,
          fetchLast100News: action
      })
      this.ListNews = ListNews
      this.NewsListIsLoading = NewsListIsLoading
  }

  get getListNews() {
    return this.ListNews
  }

  getSingleNews(id) {
    let foundSingleNews = this.ListNews.find(e => e.id.toString() === id.toString());
    return foundSingleNews
  }

  clgNews() {
    console.log(this.ListNews[0]);
    console.log(this.ListNews[1]);
  }

  get getNewsListIsLoading() {
    return this.getNewsListIsLoading
  }

  // Функция для обработки 100 новостей
  async fetchLast100News() {
    this.ListNews = [];
    // Находим последние новости
    let Last100Id = await fetch(`http://localhost:5000/api/lastnews`).then((response) =>
      response.json()
    );
    Last100Id.forEach(async (NewsId, index) => {
      try {
        let response = await fetch(`http://localhost:5000/api/news/${NewsId}`);
        const data = await response.json();
        if (!data.hasOwnProperty("error"))
          if (data.type === "story") {
            console.log(data);
            runInAction(() => {
              let NewsDate = new Date(data?.time * 1000).toLocaleString(undefined, { hour: 'numeric', minute: 'numeric' });
              this.ListNews.push(
                new NewsModel(
                  data.id,
                  data.descendants,
                  data.by,
                  data.kids,
                  data.score,
                  NewsDate,
                  data.type,
                  data.title,
                  data.url
                )
              );
              this.NewsListIsLoading = false;
            })
          }
      } catch (error) {
        console.log(error);
      }
    });

    console.log(newsState.ListNews);
  }
}

const newsState = new NewsState();
export default newsState;