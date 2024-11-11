import express from 'express';
import { login } from '../controllers/userController.js';

const router = express.Router();

// login route
router.post('/login', login);

export default router;
