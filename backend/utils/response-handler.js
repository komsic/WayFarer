export default class ResponseHandler {
  static sendResponse(res, statusCode, isError, data) {
    return res.status(statusCode).json(this.getResponse(isError, data));
  }

  static getResponse(isError, data) {
    const response = {};
    response.status = isError ? 'error' : 'success';
    response[isError ? 'error' : 'data'] = data;

    return response;
  }

  static handleError(res, error) {
    this.sendResponse(res, 422, true, error.message);
  }

  static error(err, res) {
    const message = err.message.split('||');
    this.sendResponse(res, Number(message[0]), true, message[1]);
  }

  static extractError(err) {
    const { detail, code } = err;
    const error = new Error(detail);
    error.code = code;

    return error;
  }
}
