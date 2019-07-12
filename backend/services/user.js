import User from '../db/models/user';

export default class UserService {
  static createNewUser({
    email, first_name: firstName, last_name: lastName, password, is_admin: isAdmin,
  }) {
    return new Promise((resolve, reject) => {
      User.createUser(email, firstName, lastName, password, isAdmin)
        .then((data) => {
          resolve(data.rows[0]);
        }).catch((err) => {
          const { detail, code } = err;
          const error = new Error(detail);
          error.code = code;
          reject(error);
        });
    });
  }
}
