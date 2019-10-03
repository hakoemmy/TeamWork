import datetime from 'node-datetime';
import { RESOURCE_CREATED } from '../helpers/statusCode';
import grabEmployeeIdFromToken from '../helpers/tokenDecoder';
import User from './userModel';


class Comment {
  constructor() {
    this.currentDate = datetime.create().format('m/d/Y H:M:S');
    this.comments = [];
  }

    post = (payload, articleId, token, res) => {
      const {
        comment,
      } = payload;
      const id = this.comments.length + 1;
      const authorId = grabEmployeeIdFromToken(token, res);
      let newComment = {
        id,
        authorId,
        articleId: parseInt(articleId, 10),
        comment,
        createdOn: this.currentDate,
        updatedOn: this.currentDate,
      };
      this.comments.push(newComment);
      let response = {
        id,
        author: User.grabUserDetails(authorId),
        articleId: parseInt(articleId, 10),
        comment,
        createdOn: this.currentDate,
        updatedOn: this.currentDate,
      };
      newComment = {
        status: RESOURCE_CREATED,
        message: 'comment successfully added',
        data: response,
      };

      return newComment;
    };

    getCommentsByArticleId = (id) => {
      const { comments } = this;
      const result = [];
      for (let item = 0; item < comments.length; item += 1) {
        if (comments[item].articleId === parseInt(id, 10)) {
          result.push(comments[item]);
        }
      }
      return result;
    }
}


export default new Comment();
