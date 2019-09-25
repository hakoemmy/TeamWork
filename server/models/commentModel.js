import datetime from 'node-datetime';
import { RESOURCE_CREATED } from '../helpers/statusCode';
import grabEmployeeIdFromToken from '../helpers/tokenDecoder';


class Comment {
  constructor() {
    this.currentDate = datetime.create().format('m/d/Y H:M:S');
    this.comments = [
      {
        id: 1,
        authorId: 2,
        articleId: 1,
        comment: 'Informative One!',
        createdOn: '09/03/2019 12:04:59',
        updatedOn: '09/03/2019 12:04:59',
      },
    ];
  }

    post = (payload, articleId, token, res) => {
      const {
        comment,
      } = payload;
      const currentId = this.comments.length + 1;
      let newComment = {
        id: currentId,
        authorId: grabEmployeeIdFromToken(token, res),
        articleId: parseInt(articleId, 10),
        comment,
        createdOn: this.currentDate,
        updatedOn: this.currentDate,
      };
      this.comments.push(newComment);
      let response = {
        id: currentId,
        authorId: grabEmployeeIdFromToken(token, res),
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
