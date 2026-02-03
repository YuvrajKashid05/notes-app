import express from 'express';
import { registerValidator } from '../validators/registerValidator.js';
import { registerUser } from '../controllers/userRegister.js';
import { loginUser } from '../controllers/userLogin.js';
import { registerLimiter, loginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', registerLimiter, registerValidator, registerUser);

router.post('/login', loginLimiter, loginUser);

export default router;