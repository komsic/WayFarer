/* eslint-disable no-console */
import users from './1562483808518-create-user';
import bus from './1562493931802-create-bus';
import trips from './1562494809787-create-trip';
import seats from './1562495081137-create-seat';
import bookings from './1562495343430-create-booking';
import doMigrationOp from './op';

const undoMigration = async () => {
  try {
    await doMigrationOp('down', bookings, seats, trips, bus, users);
    console.log('Undo Migration Done');
  } catch (error) {
    console.log(`Undo Migration Failed: ${error}`);
  }
};

undoMigration();
