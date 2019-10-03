import Joi from 'joi';
import Article from '../models/articleModel';
import {
  BAD_REQUEST, NOT_FOUND,
  FORBIDDEN,
} from '../helpers/statusCode';

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
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: `${result.error.details[0].message}`,
    });
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
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: 'firstName, lastName, address, gender, jobRole, department,password  can\'t be empty',
    });
  }
  if (!isNaN(firstName)
        || !isNaN(lastName)
        || !isNaN(jobRole)
        || !isNaN(department)
        || !isNaN(address)) {
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: 'firstName, lastName, JobRole, depatment and address can\'t be a number!',
    });
  }
  if (!isGenderValid(gender.toLowerCase().trim())) {
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: 'it seems that gender is invalid!',
    });
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
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: `${result.error.details[0].message}`,
    });
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
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: `${result.error.details[0].message}`,
    });
  }
  let { title, article } = req.body;
  if (!validateData(title)
        || !validateData(article)
  ) {
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: 'title or article can\'t be empty',
    });
  }
  if (!isNaN(title)
        || !isNaN(article)) {
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: 'title or article can\'t be a number!',
    });
  }
  next();
};
const isTheOwner = (req, res, next) => {
  const employeeToken = req.header('x-auth-token').trim();
  let { articleId } = req.params;
  if (isNaN(articleId)) {
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: 'articleId can\'t be a string!',
    });
  }
  if (!Article.isArticleExist(articleId)) {
    return res.status(NOT_FOUND).send({
      status: NOT_FOUND,
      error: 'Such article is not found!',
    });
  }
  if (!Article.isOwnerOfArticle(articleId, employeeToken, res)) {
    return res.status(FORBIDDEN).send({
      status: FORBIDDEN,
      error: 'Aww snap!.. you are not the owner of an article',
    });
  }
  next();
};
const isCommentReqValid = (req, res, next) => {
  const schema = {
    comment: Joi.string().required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: `${result.error.details[0].message}`,
    });
  }
  let { comment } = req.body;
  let { articleId } = req.params;
  articleId = articleId.trim();
  if (isNaN(articleId)) {
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: 'articleId can\'t be a string!',
    });
  }
  if (!validateData(comment)) {
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: 'comment can\'t be empty',
    });
  }
  next();
};
const isItThere = (req, res, next) => {
  let { articleId } = req.params;
  articleId = articleId.trim();
  if (isNaN(articleId)) {
    return res.status(BAD_REQUEST).send({
      status: BAD_REQUEST,
      error: 'articleId can\'t be a string!',
    });
  }
  if (!Article.isArticleExist(articleId)) {
    return res.status(NOT_FOUND).send({
      status: NOT_FOUND,
      error: 'Such article is not found!',
    });
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
