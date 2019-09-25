import express from 'express';
import UserController from '../controllers/userController';
import {
  isSignupReqValid,
} from '../middleware/validator';

const router = express.Router();
const userController = new UserController();

router.post('/signup', isSignupReqValid, userController.signUp);

export default router;
