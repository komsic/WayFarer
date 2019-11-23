import BookingService from '../services/booking';
import ResponseHandler from '../utils/response-handler';

export default class BookingController {
  static async bookTrip(req, res) {
    try {
      const booking = await BookingService.bookTrip(req.body);

      return ResponseHandler.sendResponse(res, 201, false, booking);
    } catch (error) {
      return ResponseHandler.sendResponse(res, 422, true, error.message);
    }
  }

  static async getBookings(req, res) {
    let data;
    try {
      data = await BookingService.getBookings(req.body);
    } catch (error) {
      data = error.message;
    }

    return ResponseHandler.sendResponse(res, 200, false, data);
  }

  static async deleteBooking(req, res) {
    try {
      let data = await BookingService.deleteBooking(req.body);
      data = {
        message: data,
      };

      return ResponseHandler.sendResponse(res, 200, false, data);
    } catch (error) {
      return ResponseHandler.error(error, res);
    }
  }
}
