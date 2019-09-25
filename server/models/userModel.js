import lodash from 'lodash';
import {
  RESOURCE_CREATED,
  REQUEST_SUCCEDED,
  UNAUTHORIZED,
} from '../helpers/statusCode';
import generateAuthToken from '../helpers/tokenEncoder';
import encryptPassword from '../helpers/passwordEncryptor';
import comparePassword from '../helpers/passwordMatcher';

class User {
  constructor() {
    this.users = [
      {
        id: 1,
        firstName: 'TUYISENGE',
        lastName: 'Sylvain',
        email: 'sylvain@gmail.com',
        password: '$2b$10$nhZCvSMTdKg/MI7gVTWwj.WCeq7tTSpr4xj4xzVmIbdCoHnwj9nwy',
        gender: 'Male',
        jobRole: 'Web developer',
        department: 'IT',
        address: 'Kigali,Rwanda',
      },
    ];
  }

    create = (payload) => {
      const {
        firstName, lastName,
        email, password, address,
        gender, jobRole, department,
      } = payload;
      const currentId = this.users.length + 1;
      let newUser = {
        token: generateAuthToken(currentId),
        id: currentId,
        firstName,
        lastName,
        email,
        password: encryptPassword(password),
        address,
        gender,
        jobRole,
        department,
      };
      this.users.push(newUser);
      newUser = {
        status: RESOURCE_CREATED,
        message: 'User created successfully',
        data: lodash.pick(newUser, ['token', 'id',
          'firstName', 'lastName', 'email',
          'address', 'jobRole', 'ogender', 'department']),
      };

      return newUser;
    };

    login = (payload) => {
      let { email, password } = payload;
      const user = this.users.find(u => (u.email === email)
       && (comparePassword(password, u.password)));
      if (!user) {
        return {
          status: UNAUTHORIZED,
          error:
       'email or password is incorrect!',
        };
      }
      const {
        id,
        firstName, lastName,
        address,
        gender, jobRole, department,
      } = user;
      let result = {
        token: generateAuthToken(id),
        firstName,
        lastName,
        email,
        address,
        jobRole,
        department,
        gender,
      };
      result = {
        status: REQUEST_SUCCEDED,
        message: 'User is successfully logged in',
        data: result,
      };

      return result;
    };

    isEmailTaken = email => this.users.find(u => u.email === email);
}

export default new User();
