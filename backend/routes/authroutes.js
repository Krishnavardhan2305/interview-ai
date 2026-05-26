import express from 'express';
const router = express.Router();
import {login, logout, register} from '../controller/authcontroller.js';

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);

export default router;