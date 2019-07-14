import UserService from '../services/user';
import ResponseHandler from '../utils/response-handler';
import Token from '../utils/middlewares/token';
import HashPassword from '../utils/middlewares/hash-password';

export default class UserController {
  static async signUp(req, res) {
    try {
      const user = await UserService.createNewUser(req.body);
      user.token = Token.generateToken(user);

      ResponseHandler.sendResponse(res, 201, false, user);
    } catch (error) {
      ResponseHandler.handleError(res, error);
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.findByEmail(email);
      if (!HashPassword.compare(password, user.password)) {
        return ResponseHandler.sendResponse(res, 401, true,
          'Authentication Failed: Password is not correct');
      }

      const { is_admin: isAdmin, user_id: id } = user;
      const token = Token.generateToken(user);

      return ResponseHandler.sendResponse(res, 200, false, {
        token,
        is_admin: isAdmin,
        user_id: id,
      });
    } catch (error) {
      ResponseHandler.handleError(res, error);
    }

    return null;
  }
}
