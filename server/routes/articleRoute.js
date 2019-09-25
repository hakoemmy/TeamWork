import express from 'express';
import ArticleController from '../controllers/articleController';
import CommentController from '../controllers/commentController';
import isEmployee from '../middleware/isEmployee';
import isValidContentType from '../middleware/isContentTypeValid';
import {
  isArticleReqValid,
  isTheOwner, isCommentReqValid,
  isItThere,
}
  from '../middleware/validator';

const router = express.Router();
const articleController = new ArticleController();
const commentController = new CommentController();

router.post('/articles',
  isValidContentType,
  isEmployee,
  isArticleReqValid,
  articleController.createArticle);

router.patch('/articles/:articleId',
  isValidContentType,
  isEmployee,
  isArticleReqValid,
  isTheOwner,
  articleController.editArticle);

router.delete('/articles/:articleId',
  isEmployee,
  isTheOwner,
  articleController.deleteArticle);

router.post('/articles/:articleId/comments',
  isValidContentType,
  isEmployee,
  isCommentReqValid,
  commentController.commentOnArticle);
router.get('/feeds',
  articleController.getAllArticle);

router.get('/articles/:articleId',
  isItThere,
  articleController.getSpecificArticle);

export default router;
