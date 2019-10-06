import bcrypt from 'bcrypt';

const encryptPassword = async(password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

export default encryptPassword;
