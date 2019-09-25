import express from 'express';
import UserController from '../controllers/userController';
import {
  isSignupReqValid,
  isSigninReqValid,
} from '../middleware/validator';

const router = express.Router();
const userController = new UserController();

router.post('/signup', isSignupReqValid, userController.signUp);
router.post('/signin', isSigninReqValid, userController.signIn);

export default router;
