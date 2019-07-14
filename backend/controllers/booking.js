import BookingService from '../services/booking';
import ResponseHandler from '../utils/response-handler';

export default class BookingController {
  static async bookTrip(req, res) {
    try {
      const booking = await BookingService.bookTrip(req.body);

      ResponseHandler.sendResponse(res, 201, false, booking);
    } catch (error) {
      ResponseHandler.sendResponse(res, 422, true, error.message);
    }
  }
}