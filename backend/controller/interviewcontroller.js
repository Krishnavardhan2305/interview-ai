import * as pdfparse from "pdf-parse";
import InterviewReport from "../models/interviewreportmodel.js";
import { generateInterviewReport } from "../services/ai.service.js";

export const generateInterviewReportController =async (req, res) => {
    try {
         console.log("FILE:", req.file);
        console.log("BODY:", req.body);
       const pdfData = await pdfparse.default(req.file.buffer);
        const resumeContent = pdfData.text;
        const {selfDescription,jobDescription} = req.body;
        const interviewReportByAi =await generateInterviewReport
        ({
                resume: resumeContent,
                selfDescription,
                jobDescription
        });
        const interviewReport =
            await InterviewReport.create({
                user: req.user.userId,
                resume: resumeContent,
                selfDescription,
                jobDescription,
                matchScore:
                    interviewReportByAi.matchScore,
                summary:
                    interviewReportByAi.summary,
                technicalQuestions:
                    interviewReportByAi.technicalQuestions,
                behavioralQuestions:
                    interviewReportByAi.behavioralQuestions,
                skillGaps:
                    interviewReportByAi.skillGaps,
                preparationPlan:
                    interviewReportByAi.preparationPlan
            });

        return res.status(201).json({
            message:
                "Interview report generated successfully",
            interviewReport
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
};