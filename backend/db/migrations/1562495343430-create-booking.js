export default {
  up: () => `CREATE TABLE bookings (
    id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
    trip_id INTEGER NOT NULL REFERENCES bus (id),
    user_id INTEGER NOT NULL REFERENCES users (id),
    seat_id INTEGER NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE
  );`,
  down: () => 'DROP TABLE bookings CASCADE',
};
