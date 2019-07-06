import express from 'express';
import v1 from './v1';
import REDIRECT_MESSAGE from '../../utils/constants';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send(`You've reached the API Routes. ${REDIRECT_MESSAGE}`);
});

router.use('/v1', v1);

export default router;
