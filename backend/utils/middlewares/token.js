import jwt from 'jsonwebtoken';

export default class Token {
  static generateToken({ email, is_admin: isAdmin, user_id: userId }) {
    return jwt.sign({ email, isAdmin, userId }, process.env.SECRET_KEY, { expiresIn: '24h' });
  }
}
