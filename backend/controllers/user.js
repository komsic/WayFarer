import UserService from '../services/user';
import ResponseHandler from '../utils/response-handler';
import Token from '../utils/middlewares/token';

export default class UserController {
  static async signUp(req, res) {
    try {
      const user = await UserService.createNewUser(req.body);
      user.token = Token.generateToken(user);

      ResponseHandler.sendResponse(res, 201, false, user);
    } catch (error) {
      const { message, code } = error;
      const isServerError = code[0] === '0' && code[1] === '8';
      const statusCode = isServerError ? 500 : 422;
      const data = isServerError ? 'Internal Server Error' : message;

      ResponseHandler.sendResponse(res, statusCode, true, data);
    }
  }
}
