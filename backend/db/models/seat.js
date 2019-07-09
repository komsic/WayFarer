import db from '../index';

const insertQuery = `INSERT INTO seats(trip_id, seat_number)
VALUES ($1, $2)
RETURNING *;`;

export default class Seat {
  static createSeat(tripId, seatNumber) {
    return db.query(insertQuery, [tripId, seatNumber]);
  }
}
