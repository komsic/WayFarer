import express from 'express';
import REDIRECT_MESSAGE from '../../../utils/constants';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send(`You've reached api/v1 routes. ${REDIRECT_MESSAGE}`);
});

export default router;
