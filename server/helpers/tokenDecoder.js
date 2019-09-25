import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { BAD_REQUEST } from './statusCode';

dotenv.config();
const grabEmployeeIdFromToken = (token, res) => {
  try {
    const { id } = jwt.verify(token, process.env.JWTSECRET);
    return id;
  } catch (error) {
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: error.message,
    });
  }
};

export default grabEmployeeIdFromToken;
