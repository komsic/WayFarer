import Joi from '@hapi/joi';
import JoiValidator from '.';

export default class BookingValidator {
  static getBookingSchema() {
    return Joi.object({
      token: JoiValidator.getTokenSchema(),
      trip_id: JoiValidator.getIntegerSchema('trip_id').required(),
      seat_number: JoiValidator.getIntegerSchema('seat_number'),
    });
  }
}
