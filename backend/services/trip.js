import Trip from '../db/models/trip';
import ResponseHandler from '../utils/response-handler';
import Utility from '../utils/util';

export default class TripService {
  static createTrip(trip) {
    return new Promise((resolve, reject) => {
      Trip.createTrip(trip)
        .then(result => resolve(result))
        .catch(err => reject(ResponseHandler.extractError(err)));
    });
  }

  static getTrips() {
    // eslint-disable-next-line new-cap
    return new Utility.promiseGeneratorForArray(null, Trip.getTrips, 'There is no trip available');
  }
}
