import Joi from '@hapi/joi';
import JoiValidator from '.';

export default class UserValidator {
  static getSignUpSchema() {
    return Joi.object({
      email: JoiValidator.getEmailSchema().required(),
      password: JoiValidator.getPasswordSchema().required(),
      first_name: JoiValidator.getStringSchema('first_name').required(),
      last_name: JoiValidator.getStringSchema('last_name').required(),
      is_admin: JoiValidator.getBooleanSchema().default(false),
    });
  }

  static getSignInSchema() {
    return Joi.object({
      email: JoiValidator.getEmailSchema().required(),
      password: JoiValidator.getPasswordSchema().required(),
    });
  }
}
