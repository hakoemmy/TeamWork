import { BAD_REQUEST } from '../helpers/statusCode';

const isValidJson = (error, req, res, next) => {
  if (error instanceof SyntaxError
     && error.status === 400 && 'body' in error) {
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: 'it seems that JSON request is invalid!',
    });
  }
  next();
};

export default isValidJson;
