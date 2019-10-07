import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Entity from '../models/crudQueries';
import ResponseHandler from '../helpers/responseHandler';
import {
  UNAUTHORIZED,
  BAD_REQUEST,
} from '../helpers/statusCode';

dotenv.config();
const userModel = new Entity('users');
const isEmployee = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return ResponseHandler.error(UNAUTHORIZED, 'System rejected. No access token found!', res);
  }

  try {
    const { id } = jwt.verify(token, process.env.JWTSECRET);
    const user = await userModel.select('*', 'id=$1', [id]);
    if (!user.length) {
      return ResponseHandler.error(UNAUTHORIZED, 'Awww, Snap!..Such kind of access token does not match any employee!', res);
    }
    next();
  } catch (error) {
    return ResponseHandler.error(BAD_REQUEST, error.message, res);
  }
};

export default isEmployee;
