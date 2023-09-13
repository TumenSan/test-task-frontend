// Модель данных для новостей

export class NewsModel {
  id = 0;
  descendants = '';
  by = '';
  kids = [];
  score = 0;
  time = 0;
  title = '';
  type = '';
  url = '';

  constructor(id, descendants, by, kids, score, time, type, title, url) {
    this.id = id;
    this.descendants = descendants;
    this.by = by;
    this.kids = kids;
    this.score = score;
    this.time = time;
    this.title = title;
    this.type = type;
    this.url = url;
  }

  update(data) {
    this.id = data.id;
    this.descendants = data.descendants;
    this.by = data.by;
    this.kids = data.kids;
    this.score = data.score;
    this.time = data.time;
    this.title = data.title;
    this.type = data.type;
    this.url = data.url;
  }
}