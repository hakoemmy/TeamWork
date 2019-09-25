import express from 'express';
import ArticleController from '../controllers/articleController';
import isEmployee from '../middleware/isEmployee';
import isValidContentType from '../middleware/isContentTypeValid';
import {
  isArticleReqValid,
}
  from '../middleware/validator';

const router = express.Router();
const articleController = new ArticleController();

router.post('/articles',
  isValidContentType,
  isEmployee,
  isArticleReqValid,
  articleController.createArticle);


export default router;
