import Booking from '../db/models/booking';

export default class BookingService {
  static bookTrip(booking) {
    return new Promise((resolve, reject) => {
      Booking.createBooking(booking)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  static getBookings(data) {
    return new Promise((resolve, reject) => {
      Booking.getBookings(data)
        .then((result) => {
          if (result.rowCount === 0) {
            reject(new Error('No booking to show'));
          }

          resolve(result.rows);
        });
    });
  }
}
