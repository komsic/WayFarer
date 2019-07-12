import Joi from '@hapi/joi';

export default class JoiValidator {
  static getStringSchema(label) {
    return Joi.string().max(100).label(label);
  }

  static getEmailSchema() {
    return this.getStringSchema('email').email();
  }

  static getPasswordSchema() {
    return this.getStringSchema('password').alphanum().min(8);
  }

  static getBooleanSchema() {
    return Joi.boolean().label('is_admin');
  }

  static validate(data, schema) {
    return Joi.validate(data, schema, { abortEarly: false });
  }

  static extractErrors(error) {
    return error.details.map(er => er.message);
  }
}
