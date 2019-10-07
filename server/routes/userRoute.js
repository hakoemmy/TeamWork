import express from 'express';
import UserController from '../controllers/userController';
import {
  isSignupReqValid,
  isSigninReqValid,
} from '../middleware/validator';

const router = express.Router();
const { signUp, signIn } = UserController;
router.post('/signup', isSignupReqValid, signUp);
router.post('/signin', isSigninReqValid, signIn);

export default router;
