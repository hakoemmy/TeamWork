import Entity from '../models/crudQueries';
import generateAuthToken from '../helpers/tokenEncoder';
import encryptPassword from '../helpers/passwordEncryptor';
import comparePassword from '../helpers/passwordMatcher';
import ResponseHandler from '../helpers/responseHandler';

import {
  REQUEST_CONFLICT,
  RESOURCE_CREATED, REQUEST_SUCCEDED,
  UNAUTHORIZED, SERVER_ERROR,
} from '../helpers/statusCode';

class UserController {
  static userModel() {
    return new Entity('users');
  }

    static signUp = async (req, res) => {
      try {
        let {
          firstName, lastName,
          email, password, address,
          gender, jobRole, department,
        } = req.body;
        const row = await this.userModel().select('*', 'email=$1', [email]);
        if (row[0]) {
          return ResponseHandler.error(REQUEST_CONFLICT, 'Email is already taken!', res);
        }
        password = await encryptPassword(password);
        const attributes = 'first_name,last_name,email,password,gender,job_role,department,address';
        const selectors = `'${firstName}', '${lastName}', '${email}', '${password}', '${gender}', '${jobRole}', '${department}', '${address}'`;
        const insertedRow = await this.userModel().insert(attributes, selectors);

        const token = generateAuthToken(insertedRow[0].id, insertedRow[0].email);

        return ResponseHandler.success(RESOURCE_CREATED, 'User created successfully', { token }, res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `OOps, Internal server error occured: ${e} `, res);
      }
    };

    static signIn = async (req, res) => {
      try {
        let { email, password } = req.body;
        const row = await this.userModel().select('*', 'email=$1', [email]);
        if (row[0] && comparePassword(password, row[0].password)) {
          const token = generateAuthToken(row[0].id, row[0].email);
          return ResponseHandler.success(REQUEST_SUCCEDED, 'User is successfully logged in', { token }, res);
        }
        return ResponseHandler.error(UNAUTHORIZED, 'email or password is incorrect!', res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `OOps, Internal server error occured: ${e} `, res);
      }
    };
}

export default UserController;
