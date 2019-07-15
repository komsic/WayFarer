import Booking from '../db/models/booking';
import Utility from '../utils/util';

export default class BookingService {
  static bookTrip(booking) {
    return Utility.promiseGenerator(booking, Booking.createBooking);
  }

  static getBookings(data) {
    // eslint-disable-next-line new-cap
    return new Utility.promiseGeneratorForArray(data, Booking.getBookings, 'No booking to show');
  }

  static deleteBooking(data) {
    return Utility.promiseGenerator(data, Booking.deleteBooking);
  }
}
