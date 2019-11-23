import Joi from '@hapi/joi';
import JoiValidator from '.';

export default class TripValidator {
  static getTripSchema() {
    return Joi.object({
      bus_id: JoiValidator.getIntegerSchema('bus_id').required(),
      origin: JoiValidator.getStringSchema('origin').required().lowercase(),
      destination: JoiValidator.getStringSchema('destination').required().lowercase(),
      trip_date: JoiValidator.getDateSchema('trip_date').required(),
      fare: JoiValidator.getAmoutSchema('fare').required(),
    });
  }

  static getQueryTripsSchema() {
    return Joi.object({
      origin: JoiValidator.getStringSchema('origin').lowercase(),
      destination: JoiValidator.getStringSchema('destination').lowercase(),
    });
  }
}
