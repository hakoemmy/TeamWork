import express from 'express';
import bodyParse from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import { NOT_FOUND } from '../helpers/statusCode';
import swaggerDoc from '../../app.json';
import userRoute from './userRoute';
import articleRoute from './articleRoute';
import isContentTypeValid from '../middleware/isContentTypeValid';
import isValidJson from '../middleware/isValidJson';

const router = express.Router();

router.use(bodyParse.json());
router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
router.use('/api/v2', isValidJson, articleRoute);
router.use('/api/v2/auth', isContentTypeValid, isValidJson, userRoute);

router.use('/', (req, res) => {
  res.status(NOT_FOUND).send({
    status: NOT_FOUND,
    message: 'Welcome to TeamWork API!',
  });
});
export default router;
