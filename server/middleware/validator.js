import Joi from 'joi';
import {
  BAD_REQUEST,
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
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
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

export {
  isSignupReqValid,
  isSigninReqValid,
};
