import users from './1562483808518-create-user';
import bus from './1562493931802-create-bus';
import trips from './1562494809787-create-trip';
import seats from './1562495081137-create-seat';
import bookings from './1562495343430-create-booking';
import doMigrationOp from './op';

const doMigration = () => {
  doMigrationOp('up', users, bus, trips, seats, bookings)
    // eslint-disable-next-line no-console
    .then(() => console.log('Migration Done'));
};

doMigration();
