export default {
  up: () => `CREATE TABLE seats (
    id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
    trip_id INTEGER NOT NULL REFERENCES trips (id),
    seat_number INTEGER NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    created_at DATE DEFAULT CURRENT_DATE
  );`,
  down: () => 'DROP TABLE seats CASCADE',
};
