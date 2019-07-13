import express from 'express';
import user from './user';
import trip from './trip';

const router = express.Router();

router.use('/auth', user);
router.use('/trips', trip);

export default router;
