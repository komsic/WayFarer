import db from '../index';
import Seat from './seat';

const insertQuery = `WITH trip_result AS (
  INSERT INTO trips(bus_id, origin, destination, trip_date, fare)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
)
SELECT trip_result.id, trip_result.bus_id, trip_result.origin,
trip_result.destination, trip_result.trip_date, trip_result.fare, bus.capacity
FROM trip_result
INNER JOIN bus
ON trip_result.bus_id = bus.id;`;

const getAllTripsQuery = `WITH available_seats AS (
  SELECT trip_id, ARRAY_AGG (seat_number ORDER BY seat_number) available_seats
  FROM seats
  WHERE is_booked = FALSE
  GROUP BY trip_id
  ORDER BY trip_id
)
SELECT trips.id, trips.bus_id, trips.origin, trips.destination, trips.trip_date, trips.fare, trips.status, available_seats.available_seats
FROM available_seats
INNER JOIN trips
ON available_seats.trip_id = trips.id;`;

const getAllTripsQueryByFilter = `WITH available_seats AS (
  SELECT trip_id, ARRAY_AGG (seat_number ORDER BY seat_number) available_seats
  FROM seats
  WHERE is_booked = FALSE
  GROUP BY trip_id
  ORDER BY trip_id
)
SELECT trips.id, trips.bus_id, trips.origin, trips.destination, trips.trip_date, trips.fare, trips.status, available_seats.available_seats
FROM available_seats
INNER JOIN trips
ON available_seats.trip_id = trips.id
WHERE trips.origin = $1 OR trips.destination = $2;`;

const cancelTripQuery = `WITH trip_result AS (
  UPDATE trips
  SET status = 'cancelled'
  WHERE id = $1
  RETURNING *
), seat_result AS (
  SELECT bookings.user_id, ARRAY_AGG (seats.seat_number ORDER BY seats.seat_number) booked_seats FROM trip_result
  INNER JOIN bookings
  ON trip_result.id = bookings.trip_id
  INNER JOIN seats
  ON bookings.seat_id = seats.id
  GROUP BY bookings.user_id
)
SELECT seat_result.user_id, seat_result.booked_seats, users.email, users.first_name, users.last_name FROM seat_result
INNER JOIN users
ON seat_result.user_id = users.id;`;

export default class Trip {
  static createTrip({
    bus_id: busId, origin, destination, trip_date: tripDate, fare,
  }) {
    return new Promise((resolve, reject) => {
      db.query(insertQuery, [busId, origin, destination, tripDate, fare])
        .then((result) => {
          const [{ id: tripId, capacity }] = result.rows;

          for (let index = 1; index <= capacity; index += 1) {
            Seat.createSeat(tripId, index);
          }

          resolve(resolve(result.rows[0]));
        }).catch((err) => {
          const error = err;
          error.detail = err.message;
          reject(error);
        });
    });
  }

  static getTrips({ origin, destination }) {
    if (origin == null && destination == null) {
      return db.query(getAllTripsQuery);
    }

    return db.query(getAllTripsQueryByFilter, [origin, destination]);
  }

  static cancelTrip({ id }) {
    return new Promise((resolve, reject) => {
      db.query('SELECT status FROM trips WHERE id = $1', [id])
        .then((result) => {
          if (result.rows.length === 0) {
            reject(new Error(`404||The trip of id ${id} does not exist`));
          } else if (result.rows[0].status === 'cancelled') {
            reject(new Error(`422||This trip of id ${id} has already been cancelled`));
          }

          db.query(cancelTripQuery, [id])
            .then(res => resolve(res));
        });
    });
  }
}
