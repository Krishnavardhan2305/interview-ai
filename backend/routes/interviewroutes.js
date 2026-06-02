import express from "express";

import { verifyToken }
from "../middleware/authmiddleware.js";

import { upload }
from "../middleware/filemiddleware.js";

import {
    generateInterviewReportController,
    getInterviewReportbyIdController,
    getAllInterviewReportsController
}
from "../controller/interviewcontroller.js";

const router = express.Router();

router.post(
    "/",
    verifyToken,
    upload.single("resume"),
    generateInterviewReportController
);

router.get(
    "/",
    verifyToken,
    getAllInterviewReportsController
);

router.get(
    "/report/:interviewId",
    verifyToken,
    getInterviewReportbyIdController
);

export default router;