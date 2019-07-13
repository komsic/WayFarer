import { Router } from 'express';
import Validators from '../../../utils/middlewares/validator';
import Token from '../../../utils/middlewares/token';
import TripController from '../../../controllers/trip';
import Permission from '../../../utils/middlewares/permission';

const router = Router();

router.post('/', Validators.validateTrip, Token.verifyToken,
  Permission.hasPermit, TripController.createTrip);

export default router;
