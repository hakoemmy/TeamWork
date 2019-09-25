import { UNSUPPORTED_CONTENT_TYPE } from '../helpers/statusCode';

const isValidContentType = (req, res, next) => {
  const contype = req.headers['content-type'];
  if (!contype || contype.indexOf('application/json') !== 0) {
    return res.status(UNSUPPORTED_CONTENT_TYPE).send({
      status: UNSUPPORTED_CONTENT_TYPE,
      error: 'content type for request must be application/json',
    });
  }

  next();
};

export default isValidContentType;
