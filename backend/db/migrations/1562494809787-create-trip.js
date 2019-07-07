export default {
  up: () => `CREATE TABLE trips (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    bus_id INTEGER NOT NULL REFERENCES bus (id),
    origin VARCHAR(150),
    destination VARCHAR(150),
    trip_date DATE,
    fare FLOAT NOT NULL CONSTRAINT positive_fare CHECK (fare > 0),
    status VARCHAR(10) DEFAULT 'active' CONSTRAINT status_type_match CHECK (status = 'active' OR status = 'cancelled'),
    created_on DATE DEFAULT CURRENT_DATE,
    CHECK (trip_date > created_on)
  );`,
  down: () => 'DROP TABLE trips CASCADE',
};
