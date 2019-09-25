import Article from '../models/articleModel';
import {
  RESOURCE_CREATED,
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
}

export default ArticleController;
