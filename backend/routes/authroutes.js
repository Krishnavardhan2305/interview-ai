import express from 'express';
const router = express.Router();
import {getuser, login, logout, register} from '../controller/authcontroller.js';
import { verifyToken } from '../middleware/authmiddleware.js';

router.post('/register',register);
router.post('/login',login);
router.get('/get-user',verifyToken,getuser);
router.get('/logout',verifyToken,logout);

export default router;