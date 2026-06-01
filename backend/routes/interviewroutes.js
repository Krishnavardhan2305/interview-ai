import express from "express";
import { verifyToken } from '../middleware/authmiddleware.js';
import { upload } from "../middleware/filemiddleware.js";
import { generateInterviewReportController } from "../controller/interviewcontroller.js";
const router=express.Router()

// router.post("/",verifyToken,upload.single("resume"),generateInterviewReportController)
router.post("/test", (req, res, next) => {
    console.log("CONTENT TYPE:", req.headers["content-type"]);
    next();
}, upload.single("resume"), (req, res) => {
    console.log(req.file);
    res.json({ success: true });
});
export default router;