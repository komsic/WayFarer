import express from 'express';
import user from './user';
import trip from './trip';
import booking from './booking';

const router = express.Router();

router.use('/auth', user);
router.use('/trips', trip);
router.use('/bookings', booking);

export default router;
