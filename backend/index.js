import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';


import connectDB from './config/db.js';
import authRoutes from './routes/authroutes.js';
import interviewRoutes from './routes/interviewroutes.js'
import { generateInterviewReport } from './services/ai.service.js';
import { resume,selfDescription,jobDescription } from './services/temp.js';
const app = express();

connectDB();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/interview',interviewRoutes);
app.use((err, req, res, next) => {
    console.error("MULTER ERROR:", err);

    res.status(500).json({
        error: err.message,
        stack: err.stack
    });
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});