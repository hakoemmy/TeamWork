import express from 'express';
import ArticleController from '../controllers/articleController';
import isEmployee from '../middleware/isEmployee';
import isValidContentType from '../middleware/isContentTypeValid';
import {
  isArticleReqValid,
  isTheOwner, isCommentReqValid,
  isItThere,
}
  from '../middleware/validator';

const router = express.Router();
const {
  createArticle, getMyArticle,
  editArticle, deleteArticle,
  getAllArticle, getSpecificArticle,
} = ArticleController;


router.post('/articles',
  isValidContentType,
  isEmployee,
  isArticleReqValid,
  createArticle);
router.get('/articles',
  isEmployee,
  getMyArticle);
router.patch('/articles/:articleId',
  isValidContentType,
  isEmployee,
  isArticleReqValid,
  isTheOwner,
  editArticle);
router.delete('/articles/:articleId',
  isEmployee,
  isTheOwner,
  deleteArticle);
router.get('/feeds',
  isEmployee,
  getAllArticle);
router.get('/articles/:articleId',
  isEmployee,
  isItThere,
  getSpecificArticle);
export default router;
