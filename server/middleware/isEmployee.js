import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Entity from '../models/crudQueries';
import {
  UNAUTHORIZED,
  BAD_REQUEST,
} from '../helpers/statusCode';

dotenv.config();
const userModel = new Entity('users');
const isEmployee = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(UNAUTHORIZED).send({
      status: UNAUTHORIZED,
      error: 'System rejected. No access token found!',
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWTSECRET);
    const user = await userModel.select('*', 'id=$1', [id]);
    if (!user.length) {
      return res.status(UNAUTHORIZED).send({
        status: UNAUTHORIZED,
        error: 'Awww, Snap!..Such kind of access token does not match any employee!',
      });
    }
    next();
  } catch (error) {
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: error.message,
    });
  }
};

export default isEmployee;
