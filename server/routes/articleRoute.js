import express from 'express';
import ArticleController from '../controllers/articleController';
import isEmployee from '../middleware/isEmployee';
import isValidContentType from '../middleware/isContentTypeValid';
import {
  isArticleReqValid,
  isTheOwner,
}
  from '../middleware/validator';

const router = express.Router();
const articleController = new ArticleController();

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

export default router;
