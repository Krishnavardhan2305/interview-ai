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
            JSON.stringify(
                interviewReportByAi,
                null,
                2
            )
        );
        const interviewReport =
            await InterviewReport.create({
                title: interviewReportByAi.title,

                matchScore:
                    interviewReportByAi.matchScore,

                summary:
                    interviewReportByAi.summary,

                technicalQuestions:
                    (interviewReportByAi.technicalQuestions || []).map(
                        (question) => ({
                            question,
                            intention:
                                "Technical assessment",
                            answer:
                                "Prepare a detailed explanation with examples."
                        })
                    ),

                behavioralQuestions:
                    (interviewReportByAi.behavioralQuestions || []).map(
                        (question) => ({
                            question,
                            intention:
                                "Behavioral assessment",
                            answer:
                                "Use STAR method while answering."
                        })
                    ),

                skillGaps:
                    (interviewReportByAi.skillGaps || []).map(
                        (skill) => ({
                            skill,
                            severity: "medium"
                        })
                    ),

                preparationPlan:
                    (interviewReportByAi.preparationPlan || []).map(
                        (item, index) => ({
                            day: index + 1,
                            focus: item.split(":")[0],
                            tasks: [item]
                        })
                    ),

                user: req.user.userId,

                resume: resumeContent,

                selfDescription,

                jobDescription
            });

        return res.status(201).json({
            success: true,
            interviewReport
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