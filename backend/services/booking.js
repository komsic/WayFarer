import Booking from '../db/models/booking';

export default class BookingService {
  static bookTrip(booking) {
    return new Promise((resolve, reject) => {
      Booking.createBooking(booking)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
}
