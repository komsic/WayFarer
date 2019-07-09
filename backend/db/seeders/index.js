/* eslint-disable no-await-in-loop */
import users from './users.json';
import bus from './bus.json';
import trips from './trips.json';
import bookings from './bookings.json';
import User from '../models/user';
import Bus from '../models/bus';
import Trip from '../models/trip';
import Booking from '../models/booking';

const startSeeding = async () => {
  for (let index = 0; index < users.length; index += 1) {
    const {
      email, first_name: firstName, last_name: lastName, password, is_admin: isAdmin,
    } = users[index];
    await User.createUser(email, firstName, lastName, password, isAdmin);
  }

  for (let index = 0; index < bus.length; index += 1) {
    const {
      number_plate: numberPlate, manufacturer, model, year, capacity,
    } = bus[index];
    await Bus.createBus(numberPlate, manufacturer, model, year, capacity);
  }

  for (let index = 0; index < trips.length; index += 1) {
    const {
      bus_id: busId, origin, destination, trip_date: tripDate, fare,
    } = trips[index];
    await Trip.createTrip(busId, origin, destination, tripDate, fare);
  }

  for (let index = 0; index < bookings.length; index += 1) {
    const {
      trip_id: tripId, user_id: userId, seat_id: seatId,
    } = bookings[index];
    await Booking.createBooking(tripId, userId, seatId);
  }

  // eslint-disable-next-line no-console
  console.log('Seeding Done');
};

startSeeding();
