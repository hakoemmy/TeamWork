import { BAD_REQUEST } from '../helpers/statusCode';
import ResponseHandler from '../helpers/responseHandler';

const isValidJson = (error, req, res, next) => {
  if (error instanceof SyntaxError
     && error.status === 400 && 'body' in error) {
    return ResponseHandler.error(BAD_REQUEST, 'it seems that JSON request is invalid!', res);
  }
  next();
};

export default isValidJson;
