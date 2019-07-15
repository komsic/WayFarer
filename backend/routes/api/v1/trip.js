import { Router } from 'express';
import Validators from '../../../utils/middlewares/validator';
import Token from '../../../utils/middlewares/token';
import TripController from '../../../controllers/trip';
import Permission from '../../../utils/middlewares/permission';

const router = Router();

router.post('/', Validators.validateTrip, Token.verifyToken,
  Permission.hasPermit, TripController.createTrip);

router.get('/', Validators.validateToken, Token.verifyToken, TripController.getTrips);
router.patch('/:id', Validators.validateIdPath, Token.verifyToken,
  Permission.hasPermit, TripController.cancelTrip);

export default router;
