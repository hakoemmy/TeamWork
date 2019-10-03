import datetime from 'node-datetime';
import Comment from './commentModel';
import User from './userModel';
import { RESOURCE_CREATED, REQUEST_SUCCEDED } from '../helpers/statusCode';
import grabEmployeeIdFromToken from '../helpers/tokenDecoder';


class Article {
  constructor() {
    this.currentDate = datetime.create().format('m/d/Y H:M:S');
    this.articles = [];
  }

    create = (payload, token, res) => {
      const {
        title, article,
      } = payload;
      const id = this.articles.length + 1;
      const authorId = grabEmployeeIdFromToken(token, res);
      const createdOn = this.currentDate;
      let newArticle = {
        id,
        authorId,
        title,
        article,
        createdOn: this.currentDate,
        updatedOn: this.currentDate,
      };
      this.articles.push(newArticle);
      let response = {
        id,
        author: User.grabUserDetails(authorId),
        title,
        article,
        createdOn,
      };
      newArticle = {
        status: RESOURCE_CREATED,
        message: 'article successfully created',
        data: response,
      };

      return newArticle;
    };

    isArticleExist = articleId => this.articles.find(a => a.id === parseInt(articleId, 10));

    isOwnerOfArticle = (articleId, token, res) => {
      const employeeId = grabEmployeeIdFromToken(token, res);
      const article = this.articles.find(
        a => a.id === parseInt(articleId, 10)
       && a.authorId === employeeId,
      );
      return article;
    };

    edit = (payload, articleId, token, res) => {
      let articleObj = this.articles.find(a => a.id === parseInt(articleId, 10));
      articleObj.title = payload.title;
      articleObj.article = payload.article;
      articleObj.authorId = grabEmployeeIdFromToken(token, res);
      articleObj.createdOn = articleObj.createdOn;
      articleObj.updatedOn = this.currentDate;
      const {
        id, title, article,
        authorId, createdOn, updatedOn,
      } = articleObj;
      const response = {
        id,
        author: User.grabUserDetails(authorId),
        title,
        article,
        createdOn,
        updatedOn,
      };
      const editedArticle = {
        status: REQUEST_SUCCEDED,
        message: 'article successfully edited',
        data: response,
      };

      return editedArticle;
    };

    delete = (articleId) => {
      const article = this.articles.find(a => a.id === parseInt(articleId, 10));
      const index = this.articles.indexOf(article);
      this.articles.splice(index, 1);
      return {
        status: REQUEST_SUCCEDED,
        message: 'article successfully deleted',
      };
    };

    getAll = () => {
      const articles = this.articles.sort((a, b) => (new Date(b.createdOn)).getTime()
      - (new Date(a.createdOn)).getTime());
      let response = [];
      for (let item = 0; item < articles.length; item += 1) {
        const {
          id, authorId, title,
          article, createdOn, updatedOn,
        } = articles[item];
        const subObj = {
          id,
          author: User.grabUserDetails(authorId),
          title,
          article,
          createdOn,
          updatedOn,
        };
        response.push(subObj);
      }

      return {
        status: REQUEST_SUCCEDED,
        message: 'success',
        data: response,
      };
    };

    getArticleById = (articleId) => {
      const foundArticle = this.articles.find(a => a.id === parseInt(articleId, 10));
      let {
        id,
        authorId,
        title,
        article,
        createdOn,
        updatedOn,
      } = foundArticle;
      let response = {
        id,
        author: User.grabUserDetails(authorId),
        title,
        article,
        createdOn,
        updatedOn,
        comments: Comment.getCommentsByArticleId(id),

      };
      return {
        status: REQUEST_SUCCEDED,
        message: 'success',
        data: response,
      };
    }
}
export default new Article();
