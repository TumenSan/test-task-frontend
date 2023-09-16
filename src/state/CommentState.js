import { makeObservable, observable, computed, action, runInAction } from "mobx";
import { CommentModel } from "../components/Models/CommentModel";

class CommentState {
  Comments = [];

  constructor(Comments) {
      makeObservable(this, {
        Comments: observable,
        getComments: computed,
        getSingleComment: action,
        fetchSingleComment: action
      })
      this.Comments = Comments
  }

  get getComments() {
    return this.Comments
  }

  getSingleComment(id) {
    let foundSingleComment = this.Comments.find(e => e.id.toString() === id.toString());
    return foundSingleComment
  }

  // Функция для обработки комментария
  async fetchSingleComment(CommentId) {
    this.Comments = [];
    try {
      let response = await fetch(`http://localhost:5000/api/comment/${CommentId}`);
      const data = await response.json();
      if (!data.hasOwnProperty("error"))
        if (data.type === "comment") {
          console.log(data);
          runInAction(() => {
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
          })
        }
    } catch (error) {
      console.log(error);
    }

    console.log(commentState.Comments);
  }

  async fetchKids(){

  }
}

const commentState = new CommentState();
export default commentState;