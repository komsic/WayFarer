import db from '../index';

const insertQuery = `INSERT INTO seats(trip_id, seat_number)
VALUES ($1, $2)
RETURNING *;`;

export default class Seat {
  static createSeat(tripId, seatNumber) {
    return db.query(insertQuery, [tripId, seatNumber]);
  }

  static selectNextAvailableSeatByTrip(tripId) {
    return db.query(`SELECT id AS seat_id FROM seats
      WHERE trip_id = $1 AND is_booked = $2
      LIMIT 1;`, [tripId, false]);
  }

  static selectByTripAndSeatNo(tripId, seatNumber) {
    return db.query(`SELECT id AS seat_id, is_booked FROM seats
      WHERE trip_id = $1 AND seat_number = $2;`, [tripId, seatNumber]);
  }
}
