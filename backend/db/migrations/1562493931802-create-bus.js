export default {
  up: () => `CREATE TABLE bus (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    number_plate VARCHAR(15) UNIQUE NOT NULL,
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    year VARCHAR(10),
    capacity INTEGER NOT NULL,
    created_on DATE DEFAULT CURRENT_DATE
  );`,
  down: () => 'DROP TABLE bus CASCADE',
};
