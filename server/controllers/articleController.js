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

    editArticle = (req, res) => {
      let { title, article } = req.body;
      let { articleId } = req.params;

      let trustedPayload = {
        title: title.trim(),
        article: article.trim(),
      };
      const employeeToken = req.header('x-auth-token').trim();
      articleId = articleId.trim();
      const response = Article.edit(trustedPayload, articleId, employeeToken, res);
      return res.status(REQUEST_SUCCEDED).send(response);
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
