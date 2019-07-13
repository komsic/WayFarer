import Joi from '@hapi/joi';
import JoiValidator from '.';

export default class TripValidator {
  static getTripSchema() {
    return Joi.object({
      token: JoiValidator.getTokenSchema(),
      bus_id: JoiValidator.getIntegerSchema('bus_id').required(),
      origin: JoiValidator.getStringSchema('origin').required(),
      destination: JoiValidator.getStringSchema('destination').required(),
      trip_date: JoiValidator.getDateSchema('trip_date').required(),
      fare: JoiValidator.getAmoutSchema('fare').required(),
    });
  }
}
