import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authroutes.js';
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

const server = app.listen(5000, () => {
    console.log('Server is running on port 5000');
});