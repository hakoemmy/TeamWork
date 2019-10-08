import datetime from 'node-datetime';
import Entity from '../models/crudQueries';
import Article from '../models/articleModel';
import grabEmployeeIdFromToken from '../helpers/tokenDecoder';
import ResponseHandler from '../helpers/responseHandler';
import {
  RESOURCE_CREATED, REQUEST_SUCCEDED, SERVER_ERROR,
} from '../helpers/statusCode';


class ArticleController {
  static articleModel() {
    return new Entity('articles');
  }

    static createArticle = async (req, res) => {
      try {
        let { title, article } = req.body;
        let token = req.header('x-auth-token');
        const authorId = grabEmployeeIdFromToken(token, res);
        const currentDate = datetime.create().format('m/d/Y H:M:S');
        const attributes = 'authorid,title,article,created_on,updated_on';
        const selectors = `'${authorId}', '${title}', '${article}', '${currentDate}', '${currentDate}'`;
        const createdArticle = await this.articleModel().insert(attributes, selectors);
        return ResponseHandler.success(RESOURCE_CREATED, 'article successfully created', createdArticle, res);
      } catch (e) {
        console.log(e);
        return ResponseHandler.error(SERVER_ERROR, 'OOps, Internal server error occured.', res);
      }
    };

    static getMyArticle = async (req, res) => {
      try {
        const token = req.header('x-auth-token');
        const authorId = grabEmployeeIdFromToken(token, res);
        const articles = await this.articleModel().select('*', 'authorid=$1', [authorId]);
        return ResponseHandler.success(REQUEST_SUCCEDED, 'Your articles returned successfully', articles, res);
      } catch (e) {
        console.log(e);
        return ResponseHandler.error(SERVER_ERROR, 'OOps, Internal server error occured.', res);
      }
    };

    static editArticle = async (req, res) => {
      let { title, article } = req.body;
      let { articleId } = req.params;
      const currentDate = datetime.create().format('m/d/Y H:M:S');

      ArticleController.articleModel().update('title=$1', 'id=$2', [title, articleId]);
      ArticleController.articleModel().update('article=$1', 'id=$2', [article, articleId]);
      ArticleController.articleModel().update('updated_on=$1', 'id=$2', [currentDate, articleId]);

      return ResponseHandler.success(REQUEST_SUCCEDED, 'article successfully edited', req.body, res);
    };

    deleteArticle = (req, res) => {
      let { articleId } = req.params;
      articleId = articleId.trim();
      const response = Article.delete(articleId);
      return res.status(REQUEST_SUCCEDED).send(response);
    };

    getAllArticle = (req, res) => {
      const articleFeeds = Article.getAll();
      return res.status(REQUEST_SUCCEDED).send(articleFeeds);
    };

    getSpecificArticle = (req, res) => {
      let { articleId } = req.params;
      articleId = articleId.trim();
      const article = Article.getArticleById(articleId);
      return res.status(REQUEST_SUCCEDED).send(article);
    };
}

export default ArticleController;
