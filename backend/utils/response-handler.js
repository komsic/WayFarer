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
}
