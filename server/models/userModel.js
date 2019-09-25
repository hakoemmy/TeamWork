import lodash from 'lodash';
import {
  RESOURCE_CREATED,
} from '../helpers/statusCode';
import generateAuthToken from '../helpers/tokenEncoder';
import encryptPassword from '../helpers/passwordEncryptor';

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

    isEmailTaken = email => this.users.find(u => u.email === email);
}

export default new User();
