import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const generateAuthToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWTSECRET);
  return token;
};

export default generateAuthToken;
