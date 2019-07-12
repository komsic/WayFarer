import User from '../db/models/user';
import ResponseHandler from '../utils/response-handler';

export default class UserService {
  static createNewUser({
    email, first_name: firstName, last_name: lastName, password, is_admin: isAdmin,
  }) {
    return new Promise((resolve, reject) => {
      User.createUser(email, firstName, lastName, password, isAdmin)
        .then((data) => {
          resolve(data.rows[0]);
        }).catch((err) => {
          reject(ResponseHandler.extractError(err));
        });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      User.findByEmail(email)
        .then((data) => {
          if (data.rowCount === 0) {
            reject(new Error('Email does not exist'));
          }
          resolve(data.rows[0]);
        });
    });
  }
}
