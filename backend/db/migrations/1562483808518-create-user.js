export default {
  up: () => `CREATE TABLE users (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(150) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    created_on DATE DEFAULT CURRENT_DATE
  );`,
  down: () => 'DROP TABLE users CASCADE',
};
