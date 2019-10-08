import Joi from 'joi';
import ResponseHandler from '../helpers/responseHandler';
import Entity from '../models/crudQueries';
import grabEmployeeIdFromToken from '../helpers/tokenDecoder';
import {
  BAD_REQUEST, NOT_FOUND,
  FORBIDDEN,
} from '../helpers/statusCode';

const articleModel = new Entity('articles');
const validateData = (field) => {
  const entity = field.replace(/[^a-zA-Z0-9]/g, '');
  if (entity) return true;
  return false;
};
const isGenderValid = (gender) => {
  if (gender === 'female'
      || gender === 'f'
      || gender === 'male'
      || gender === 'm') {
    return true;
  }
  return false;
};

const isSignupReqValid = (req, res, next) => {
  const schema = {
    firstName: Joi.string().min(4).required(),
    lastName: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    address: Joi.string().required(),
    gender: Joi.string().required(),
    jobRole: Joi.string().required(),
    department: Joi.string().required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return ResponseHandler.error(BAD_REQUEST, `${result.error.details[0].message}`, res);
  }
  let {
    firstName, lastName,
    password, address,
    gender, jobRole, department,
  } = req.body;
  if (!validateData(firstName)
        || !validateData(lastName)
        || !validateData(address)
        || !validateData(gender)
        || !validateData(jobRole)
        || !validateData(department)
        || !validateData(password)
  ) {
    return ResponseHandler.error(BAD_REQUEST, 'firstName, lastName, address, gender, jobRole, department,password  can\'t be empty', res);
  }
  if (!isNaN(firstName)
        || !isNaN(lastName)
        || !isNaN(jobRole)
        || !isNaN(department)
        || !isNaN(address)) {
    return ResponseHandler.error(BAD_REQUEST, 'firstName, lastName, JobRole, depatment and address can\'t be a number!', res);
  }
  if (!isGenderValid(gender.toLowerCase().trim())) {
    return ResponseHandler.error(BAD_REQUEST, 'it seems that gender is invalid!', res);
  }
  next();
};
const isSigninReqValid = (req, res, next) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return ResponseHandler.error(BAD_REQUEST, `${result.error.details[0].message}`, res);
  }
  next();
};
const isArticleReqValid = (req, res, next) => {
  const schema = {
    title: Joi.string().required(),
    article: Joi.string().required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return ResponseHandler.error(BAD_REQUEST, `${result.error.details[0].message}`, res);
  }
  let { title, article } = req.body;
  if (!validateData(title)
        || !validateData(article)
  ) {
    return ResponseHandler.error(BAD_REQUEST, 'title or article can\'t be empty', res);
  }
  if (!isNaN(title)
        || !isNaN(article)) {
    return ResponseHandler.error(BAD_REQUEST, 'title or article can\'t be a number!', res);
  }
  next();
};
const isTheOwner = async (req, res, next) => {
  const employeeToken = req.header('x-auth-token').trim();
  let { articleId } = req.params;
  if (isNaN(articleId)) {
    return ResponseHandler.error(BAD_REQUEST, 'articleId can\'t be a string!', res);
  }
  const article = await articleModel.select('*', 'id=$1', [articleId]);
  if (!article.length) {
    return ResponseHandler.error(NOT_FOUND, 'Such article is not found!', res);
  }
  const authorId = grabEmployeeIdFromToken(employeeToken, res);
  if (!(article[0].authorid === authorId)) {
    return ResponseHandler.error(FORBIDDEN, 'Aww snap!.. you are not the owner of an article', res);
  }
  next();
};
const isCommentReqValid = (req, res, next) => {
  const schema = {
    comment: Joi.string().required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return ResponseHandler.error(BAD_REQUEST, `${result.error.details[0].message}`, res);
  }
  let { comment } = req.body;
  let { articleId } = req.params;
  articleId = articleId.trim();
  if (isNaN(articleId)) {
    return ResponseHandler.error(BAD_REQUEST, 'articleId can\'t be a string!', res);
  }
  if (!validateData(comment)) {
    return ResponseHandler.error(BAD_REQUEST, 'comment can\'t be empty', res);
  }
  next();
};
const isItThere = async (req, res, next) => {
  let { articleId } = req.params;
  articleId = articleId.trim();
  if (isNaN(articleId)) {
    return ResponseHandler.error(BAD_REQUEST, 'articleId can\'t be a string!', res);
  }
  const articleFound = await articleModel.select('*', 'id=$1', [articleId]);
  if (!articleFound.length) {
    return ResponseHandler.error(NOT_FOUND, 'Such article is not found!', res);
  }
  next();
};
export {
  isSignupReqValid,
  isSigninReqValid,
  isArticleReqValid,
  isTheOwner,
  isCommentReqValid,
  isItThere,
};
