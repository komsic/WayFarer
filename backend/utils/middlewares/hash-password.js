import bcrypt from 'bcryptjs';

export default class HashPassword {
  static hash(req, res, next) {
    const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(15));
    req.body.password = password;

    return next();
  }

  static compare(loggedInPassword, userPassword) {
    return bcrypt.compareSync(loggedInPassword, userPassword);
  }
}
