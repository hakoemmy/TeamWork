import User from '../models/userModel';
import {
  REQUEST_CONFLICT,
  RESOURCE_CREATED, REQUEST_SUCCEDED,
  UNAUTHORIZED,
} from '../helpers/statusCode';

class UserController {
    signUp = (req, res) => {
      let {
        firstName, lastName,
        email, password, address,
        gender, jobRole, department,
      } = req.body;
      if (User.isEmailTaken(email)) {
        return res.status(REQUEST_CONFLICT).send({
          status: REQUEST_CONFLICT,
          error: 'Email is already taken!',
        });
      }
      let singUpPayload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password.trim(),
        gender: gender.trim(),
        jobRole: jobRole.trim(),
        department: department.trim(),
        address: address.trim(),
      };
      const user = User.create(singUpPayload);
      return res.status(RESOURCE_CREATED).send(user);
    };
}

export default UserController;
