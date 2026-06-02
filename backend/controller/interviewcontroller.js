import InterviewReport from "../models/interviewreportmodel.js";
import { generateInterviewReport } from "../services/ai.service.js";

export const generateInterviewReportController = async (req, res) => {
    try {
        console.log("FILE:", req.file);
        console.log("BODY:", req.body);

        let resumeContent = "";

        if (req.file) {
            resumeContent = "Resume Uploaded";
        }

        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi =
            await generateInterviewReport({
                resume: resumeContent,
                selfDescription,
                jobDescription
            });

        console.log(
            "AI RESPONSE:",
            JSON.stringify(
                interviewReportByAi,
                null,
                2
            )
        );

        return res.status(200).json({
            success: true,
            aiResponse: interviewReportByAi
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message
        });
    }
};

export const getInterviewReportbyIdController = async (
    req,
    res
) => {
    try {
        const { interviewId } = req.params;

        const interviewReport =
            await InterviewReport.findById(
                interviewId
            );

        if (!interviewReport) {
            return res.status(404).json({
                message:
                    "Interview report not found"
            });
        }

        if (
            interviewReport.user.toString() !==
            req.user.userId
        ) {
            return res.status(403).json({
                message:
                    "Unauthorized access"
            });
        }

        return res.status(200).json({
            interviewReport
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message
        });
    }
};

export const getAllInterviewReportsController =
    async (req, res) => {
        try {
            const interviewReports =
                await InterviewReport.find({
                    user: req.user.userId
                });

            return res.status(200).json({
                interviewReports
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: error.message
            });
        }
    };