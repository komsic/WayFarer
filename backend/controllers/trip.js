import TripService from '../services/trip';
import ResponseHandler from '../utils/response-handler';

export default class TripController {
  static async createTrip(req, res) {
    try {
      const newTrip = await TripService.createTrip(req.body);

      ResponseHandler.sendResponse(res, 201, false, newTrip);
    } catch (error) {
      ResponseHandler.handleError(res, error);
    }
  }
}
