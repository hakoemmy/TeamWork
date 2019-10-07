import User from '../models/userModel';
import Entity from '../models/crudQueries';
import generateAuthToken from '../helpers/tokenEncoder';
import encryptPassword from '../helpers/passwordEncryptor';
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
          return res.status(REQUEST_CONFLICT).send({
            status: REQUEST_CONFLICT,
            error: 'Email is already taken!',
          });
        }
        password = await encryptPassword(password);
        const attributes = 'first_name,last_name,email,password,gender,job_role,department,address';
        const selectors = `'${firstName}', '${lastName}', '${email}', '${password}', '${gender}', '${jobRole}', '${department}', '${address}'`;
        const insertedRow = await this.userModel().insert(attributes, selectors);

        const token = generateAuthToken(insertedRow[0].id);

        return res.status(RESOURCE_CREATED).send({
          status: RESOURCE_CREATED,
          message: 'User created successfully',
          data: {
            token,
          },
        });
      } catch (e) {
        return res.status(SERVER_ERROR).json({
          status: SERVER_ERROR,
          error: 'OOps, Internal server error occured.',
        });
      }
    };

    signIn = (req, res) => {
      let { email, password } = req.body;
      let loginPayload = {
        email: email.trim(),
        password: password.trim(),
      };
      const user = User.login(loginPayload);
      if (user.status === REQUEST_SUCCEDED) {
        return res.status(REQUEST_SUCCEDED).send(user);
      }
      return res.status(UNAUTHORIZED).send(user);
    };
}

export default UserController;
