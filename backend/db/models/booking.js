import db from '../index';

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

export default class Booking {
  static createBooking(tripId, userId, seatId) {
    return db.query(insertQuery, [tripId, userId, seatId]);
  }
}
