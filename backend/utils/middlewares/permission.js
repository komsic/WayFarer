import ResponseHandler from '../response-handler';

export default class Permission {
  static hasPermit(req, res, next) {
    if (!req.body.is_admin) {
      return ResponseHandler.sendResponse(res, 403, true,
        'Authorization Failed: You do not have permission to perform this operation');
    }

    return next();
  }
}
