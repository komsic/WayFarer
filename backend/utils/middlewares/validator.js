import JoiValidator from '../validators';
import UserValidator from '../validators/user';
import ResponseHandler from '../response-handler';
import TripValidator from '../validators/trip';
import BookingValidator from '../validators/booking';

export default class Validators {
  static validateSignUp(req, res, next) {
    Validators.validate(req, res, next, UserValidator.getSignUpSchema());
  }

  static validateSignIn(req, res, next) {
    Validators.validate(req, res, next, UserValidator.getSignInSchema());
  }

  static validateTrip(req, res, next) {
    Validators.validate(req, res, next, TripValidator.getTripSchema());
  }

  static validateGetTrips(req, res, next) {
    const keys = Object.keys(req.query);
    if (keys.length !== 0) {
      keys.forEach((key) => {
        req.body[key] = req.query[key];
      });
    }

    Validators.validate(req, res, next, TripValidator.getQueryTripsSchema());
  }

  static validateToken(req, res, next) {
    Validators.validate(req, res, next, JoiValidator.getTokenSchemaAsObject());
  }

  static validateIdPath(req, res, next) {
    req.body.id = req.params.id;
    Validators.validate(req, res, next, JoiValidator.getIdPathSchema());
  }

  static validateBooking(req, res, next) {
    Validators.validate(req, res, next, BookingValidator.getBookingSchema());
  }

  static validate(req, res, next, schema) {
    const result = JoiValidator.validate(req.body, schema);
    if (result.error) {
      const error = JoiValidator.extractErrors(result.error);

      ResponseHandler.sendResponse(res, 400, true, error);
    } else {
      req.body = result.value;
      next();
    }
  }
}
