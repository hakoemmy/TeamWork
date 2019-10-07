import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const generateAuthToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWTSECRET);
  return token;
};

export default generateAuthToken;
