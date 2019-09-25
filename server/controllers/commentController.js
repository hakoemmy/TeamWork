import Comment from '../models/commentModel';
import Article from '../models/articleModel';
import {
  NOT_FOUND,
  RESOURCE_CREATED,
} from '../helpers/statusCode';

class CommentController {
  commentOnArticle = (req, res) => {
    const employeeToken = req.header('x-auth-token').trim();
    let { articleId } = req.params;
    let { comment } = req.body;
    if (!Article.isArticleExist(articleId)) {
      return res.status(NOT_FOUND).send({
        status: NOT_FOUND,
        error: 'Such article is not found!',
      });
    }
    let commentPayload = {
      comment: comment.trim(),
    };
    const response = Comment.post(commentPayload, articleId, employeeToken, res);
    return res.status(RESOURCE_CREATED).send(response);
  };
}

export default CommentController;
