import db from '../index';
import Seat from './seat';

const insertQuery = `WITH booking_result AS (
  INSERT INTO bookings(trip_id, user_id, seat_id)
  VALUES ($1, $2, $3)
  RETURNING *
), seat_result AS (
  UPDATE seats
  SET is_booked = TRUE
  FROM booking_result
  WHERE seats.id = booking_result.seat_id
  AND seats.trip_id = booking_result.trip_id
  RETURNING booking_result.id, booking_result.trip_id, booking_result.user_id, seats.seat_number
)
SELECT seat_result.id AS booking_id, seat_result.user_id, seat_result.trip_id, trips.bus_id,
trips.trip_date, seat_result.seat_number, users.first_name, users.last_name, users.email
FROM seat_result
INNER JOIN trips
ON seat_result.trip_id = trips.id
INNER JOIN users
ON seat_result.user_id = users.id;`;

const selectAllBookingsQuery = `SELECT bookings.id AS booking_id, bookings.user_id, users.first_name,
users.last_name, users.email, bookings.trip_id, trips.origin,
trips.destination, trips.trip_date, trips.fare, trips.status, trips.bus_id,
bus.number_plate, bus.model, bus.manufacturer, seats.seat_number
FROM bookings
INNER JOIN users
ON bookings.user_id = users.id
INNER JOIN seats
ON bookings.seat_id = seats.id
INNER JOIN trips
ON bookings.trip_id = trips.id
INNER JOIN bus
ON trips.bus_id = bus.id;`;

const selectUserBookingsQuery = `SELECT bookings.id AS booking_id, bookings.user_id, users.first_name,
users.last_name, users.email, bookings.trip_id, trips.origin,
trips.destination, trips.trip_date, trips.fare, trips.status, trips.bus_id,
bus.number_plate, bus.model, bus.manufacturer, seats.seat_number
FROM bookings
INNER JOIN users
ON bookings.user_id = users.id
INNER JOIN seats
ON bookings.seat_id = seats.id
INNER JOIN trips
ON bookings.trip_id = trips.id
INNER JOIN bus
ON trips.bus_id = bus.id
WHERE bookings.user_id = $1;`;

export default class Booking {
  static createBooking({ trip_id: tripId, user_id: userId, seat_number: seatNumber }) {
    return new Promise(async (resolve, reject) => {
      try {
        let seat;
        if (!seatNumber) {
          seat = await Seat.selectNextAvailableSeatByTrip(tripId);
        } else {
          seat = await Seat.selectByTripAndSeatNo(tripId, seatNumber);
        }

        const [{ seat_id: seatId, is_booked: isBooked }] = seat.rows;
        if (isBooked) {
          reject(new Error(`The seat with number ${seatNumber} has already been booked`));
        }

        db.query(insertQuery, [tripId, userId, seatId])
          .then(result => resolve(result.rows[0]));
      } catch (error) {
        reject(new Error(`It's either the seats have all been booked or the trip with id ${tripId} doesn't exist. Also, the seat with number ${seatNumber} you requested might not exist.`));
      }
    });
  }

  static getBookings({ is_admin: isAdmin, user_id: userId }) {
    if (isAdmin) {
      return this.getAllBookings();
    }

    return this.getUserBookings(userId);
  }

  static getAllBookings() {
    return db.query(selectAllBookingsQuery);
  }

  static getUserBookings(userId) {
    return db.query(selectUserBookingsQuery, [userId]);
  }
}
