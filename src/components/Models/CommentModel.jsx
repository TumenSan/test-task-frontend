// Создадим модель данных для комментариев

export class CommentModel {
  id = 0;
  descendants = '';
  by = '';
  kids = [];
  score = 0;
  time = 0;
  type = '';
  url = '';

  constructor(id, descendants, by, kids, score, time, type, url) {
    this.id = id;
    this.descendants = descendants;
    this.by = by;
    this.kids = kids;
    this.score = score;
    this.time = time;
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
    this.type = data.type;
    this.url = data.url;
  }

  addComment(comment) {
    this.comments.push(comment);
  }
}