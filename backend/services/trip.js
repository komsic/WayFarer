import Trip from '../db/models/trip';
import ResponseHandler from '../utils/response-handler';

export default class TripService {
  static createTrip(trip) {
    return new Promise((resolve, reject) => {
      Trip.createTrip(trip)
        .then(result => resolve(result))
        .catch(err => reject(ResponseHandler.extractError(err)));
    });
  }
}
