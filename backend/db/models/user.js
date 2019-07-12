import db from '../index';

const insertQuery = `INSERT INTO users(email, first_name, last_name, password, is_admin)
VALUES ($1, $2, $3, $4, $5)
RETURNING id AS user_id, is_admin;`;

export default class User {
  static createUser(email, firstName, lastName, password, isAdmin) {
    return db.query(insertQuery, [email, firstName, lastName, password, isAdmin]);
  }

  static findByEmail(email) {
    return db.query(`SELECT * FROM users
    WHERE email = $1;
    `, [email]);
  }
}
