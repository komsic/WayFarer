import { Router } from 'express';
import UserController from '../../../controllers/user';
import Validators from '../../../utils/middlewares/validator';
import HashPassword from '../../../utils/middlewares/hash-password';

const router = Router();

router.post('/signup', Validators.validateSignUp, HashPassword.hash, UserController.signUp);

export default router;
