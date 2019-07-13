import bcrypt from 'bcryptjs';

export default class HashPassword {
  static hash(req, res, next) {
    req.body.password = HashPassword.hashString(req.body.password);

    return next();
  }

  static compare(loggedInPassword, userPassword) {
    return bcrypt.compareSync(loggedInPassword, userPassword);
  }

  static hashString(data) {
    return bcrypt.hashSync(data, bcrypt.genSaltSync(15));
  }
}
