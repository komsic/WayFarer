import { Router } from 'express';
import Validators from '../../../utils/middlewares/validator';
import Token from '../../../utils/middlewares/token';
import BookingController from '../../../controllers/booking';

const router = Router();

router.post('/', Validators.validateBooking, Token.verifyToken, BookingController.bookTrip);

export default router;
