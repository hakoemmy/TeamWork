import Article from '../models/articleModel';
import {
  RESOURCE_CREATED, REQUEST_SUCCEDED,
} from '../helpers/statusCode';

class ArticleController {
    createArticle = (req, res) => {
      let { title, article } = req.body;
      let postPayload = {
        title: title.trim(),
        article: article.trim(),
      };
      const response = Article.create(postPayload, req.header('x-auth-token'), res);
      return res.status(RESOURCE_CREATED).send(response);
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