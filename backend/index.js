import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';


import connectDB from './config/db.js';
import authRoutes from './routes/authroutes.js';
import { generateInterviewReport } from './services/ai.service.js';
import { resume,selfDescription,jobDescription } from './services/temp.js';
const app = express();

connectDB();
generateInterviewReport({resume,selfDescription,jobDescription})
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});