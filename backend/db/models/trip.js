import db from '../index';
import Seat from './seat';

const insertQuery = `WITH trip_result AS (
  INSERT INTO trips(bus_id, origin, destination, trip_date, fare)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
)
SELECT trip_result.id AS trip_id, trip_result.bus_id, trip_result.origin,
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

export default class Trip {
  static createTrip({
    bus_id: busId, origin, destination, trip_date: tripDate, fare,
  }) {
    return new Promise((resolve, reject) => {
      db.query(insertQuery, [busId, origin, destination, tripDate, fare])
        .then((result) => {
          const [{ trip_id: tripId, capacity }] = result.rows;

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

  static getTrips() {
    return db.query(getAllTripsQuery);
  }
}
