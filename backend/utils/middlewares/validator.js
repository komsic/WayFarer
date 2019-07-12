import JoiValidator from '../validators';
import UserValidator from '../validators/user';
import ResponseHandler from '../response-handler';

export default class Validators {
  static validateSignUp(req, res, next) {
    const result = JoiValidator.validate(req.body, UserValidator.getSignUpSchema());
    if (result.error) {
      const error = JoiValidator.extractErrors(result.error);

      return ResponseHandler.sendResponse(res, 400, true, error);
    }

    req.body = result.value;

    return next();
  }
}
