import JoiValidator from '../validators';
import UserValidator from '../validators/user';
import ResponseHandler from '../response-handler';
import TripValidator from '../validators/trip';

export default class Validators {
  static validateSignUp(req, res, next) {
    req.body = Validators.validate(req.body, UserValidator.getSignUpSchema(), res);

    return next();
  }

  static validateSignIn(req, res, next) {
    Validators.validate(req.body, UserValidator.getSignInSchema(), res);

    return next();
  }

  static validateTrip(req, res, next) {
    req.body = Validators.validate(req.body, TripValidator.getTripSchema(), res);

    next();
  }

  static validateToken(req, res, next) {
    Validators.validate(req.body.token, JoiValidator.getTokenSchema(), res);

    next();
  }

  static validate(data, schema, res) {
    const result = JoiValidator.validate(data, schema);
    if (result.error) {
      const error = JoiValidator.extractErrors(result.error);

      return ResponseHandler.sendResponse(res, 400, true, error);
    }

    return result.value;
  }
}
