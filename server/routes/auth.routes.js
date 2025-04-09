import { Router } from 'express';
import { login, verifyToken } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', login);


router.post('/verify-token', verifyToken);

export default router;