/* eslint-disable no-console */
import db from '../index';
import users from './1562483808518-create-user';
import bus from './1562493931802-create-bus';
import trips from './1562494809787-create-trip';
import seats from './1562495081137-create-seat';
import bookings from './1562495343430-create-booking';

const doMigration = async () => {
  try {
    await db.query(users.up());
    await db.query(bus.up());
    await db.query(trips.up());
    await db.query(seats.up());
    await db.query(bookings.up());
    console.log('Migration Done');
  } catch (error) {
    console.log(`Migration Failed: ${error}`);
  }
};

doMigration();
