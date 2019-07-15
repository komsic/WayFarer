import Joi from '@hapi/joi';

export default class JoiValidator {
  static getStringSchema(label, max = 100) {
    return Joi.string().max(max).label(label);
  }

  static getEmailSchema() {
    return this.getStringSchema('email', 150).email();
  }

  static getPasswordSchema() {
    return this.getStringSchema('password', 150).min(8);
  }

  static getTokenSchema() {
    return this.getStringSchema('token', 100000).required();
  }

  static getBooleanSchema() {
    return Joi.boolean().label('is_admin');
  }

  static getDateSchema(label) {
    return Joi.date().label(label);
  }

  static getNumberSchema(label) {
    return Joi.number().positive().label(label);
  }

  static getAmoutSchema(label) {
    return this.getNumberSchema(label).precision(2);
  }

  static getIntegerSchema(label) {
    return this.getNumberSchema(label).integer();
  }

  static getIdPathSchema() {
    return Joi.object({
      id: this.getNumberSchema('id').required(),
      token: this.getTokenSchema(),
    });
  }

  static validate(data, schema) {
    return Joi.validate(data, schema, { abortEarly: false });
  }

  static extractErrors(error) {
    return error.details.map(er => er.message);
  }
}
