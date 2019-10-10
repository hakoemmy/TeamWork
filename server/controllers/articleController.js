import datetime from 'node-datetime';
import Entity from '../models/crudQueries';
import grabEmployeeIdFromToken from '../helpers/tokenDecoder';
import ResponseHandler from '../helpers/responseHandler';
import {
  RESOURCE_CREATED, REQUEST_SUCCEDED, SERVER_ERROR, REQUEST_CONFLICT,
} from '../helpers/statusCode';


class ArticleController {
  static articleModel() {
    return new Entity('articles');
  }

  static commentModel() {
    return new Entity('comments');
  }

    static createArticle = async (req, res) => {
      try {
        let { title, article } = req.body;
        let token = req.header('x-auth-token');
        const authorId = grabEmployeeIdFromToken(token, res);
        const currentDate = datetime.create().format('m/d/Y H:M:S');
        // const articles = await this.articleModel().select('*', 'authorid=$1', [authorId]);
        // const foundArticle = articles.find(a => a.title === title);
        // if (foundArticle) {
        //   return ResponseHandler.error(REQUEST_CONFLICT, 'The same article exists', res);
        // }
        const attributes = 'authorid,title,article,created_on,updated_on';
        const selectors = `'${authorId}', '${title}', '${article}', '${currentDate}', '${currentDate}'`;
        const createdArticle = await this.articleModel().insert(attributes, selectors);
        return ResponseHandler.success(RESOURCE_CREATED, 'article successfully created', createdArticle, res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `OOps, Internal server error occured: ${e} `, res);
      }
    };

    static getMyArticle = async (req, res) => {
      try {
        const token = req.header('x-auth-token');
        const authorId = grabEmployeeIdFromToken(token, res);
        const articles = await this.articleModel().select('*', 'authorid=$1', [authorId]);
        return ResponseHandler.success(REQUEST_SUCCEDED, 'Your articles returned successfully', articles, res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `OOps, Internal server error occured: ${e} `, res);
      }
    };

    static editArticle = async (req, res) => {
      try {
        let { title, article } = req.body;
        let { articleId } = req.params;
        const currentDate = datetime.create().format('m/d/Y H:M:S');

        ArticleController.articleModel().update('title=$1', 'id=$2', [title, articleId]);
        ArticleController.articleModel().update('article=$1', 'id=$2', [article, articleId]);
        ArticleController.articleModel().update('updated_on=$1', 'id=$2', [currentDate, articleId]);

        return ResponseHandler.success(REQUEST_SUCCEDED, 'article successfully edited', req.body, res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `OOps, Internal server error occured: ${e} `, res);
      }
    };

    static deleteArticle = async (req, res) => {
      try {
        let { articleId } = req.params;
        articleId = articleId.trim();
        await ArticleController.articleModel().delete('id=$1', [articleId]);
        return ResponseHandler.success(REQUEST_SUCCEDED, 'article successfully deleted', [], res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `OOps, Internal server error occured: ${e} `, res);
      }
    };

    static getAllArticle = async (req, res) => {
      try {
        let allArticles = await this.articleModel().select('*');
        const sortedArticles = allArticles.sort((a, b) => (new Date(b.created_on)).getTime()
        - (new Date(a.created_on)).getTime());
        return ResponseHandler.success(REQUEST_SUCCEDED, 'success', sortedArticles, res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `OOps, Internal server error occured: ${e} `, res);
      }
    };

    static getSpecificArticle = async (req, res) => {
      try {
        let { articleId } = req.params;
        articleId = articleId.trim();
        const acertainArticle = await this.articleModel().select('*', 'id=$1', [articleId]);
        let {
          id,
          authorid,
          title,
          article,
          created_on,
          updated_on,
        } = acertainArticle[0];
        const comments = await this.commentModel().select('*', 'articleid=$1', [id]);
        let response = {
          id,
          authorid,
          title,
          article,
          created_on,
          updated_on,
          comments,
        };
        return ResponseHandler.success(REQUEST_SUCCEDED, 'success', response, res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `OOps, Internal server error occured: ${e} `, res);
      }
    };
}

export default ArticleController;
