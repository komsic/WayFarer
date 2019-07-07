/* eslint-disable no-console */
import db from '../index';
import users from './1562483808518-create-user';
import bus from './1562493931802-create-bus';
import trips from './1562494809787-create-trip';
import seats from './1562495081137-create-seat';
import bookings from './1562495343430-create-booking';

const undoMigration = async () => {
  try {
    await db.query(bookings.down());
    await db.query(seats.down());
    await db.query(trips.down());
    await db.query(bus.down());
    await db.query(users.down());
    console.log('Undo Migration Done');
  } catch (error) {
    console.log(`Undo Migration Failed: ${error}`);
  }
};

undoMigration();
