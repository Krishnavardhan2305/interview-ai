import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const interviewReportSchema = z.object({

    matchScore: z.number()
        .min(0)
        .max(100)
        .describe(
            "Overall percentage match between the candidate profile and the job requirements"
        ),

    summary: z.string().describe(
        "A concise evaluation of the candidate's strengths, weaknesses, interview readiness, and overall fit for the role"
    ),

    technicalQuestions: z.array(
        z.object({
            question: z.string().describe(
                "A technical interview question relevant to the job and candidate profile"
            ),

            intention: z.string().describe(
                "The interviewer's objective behind asking this question and what skill is being evaluated"
            ),

            answer: z.string().describe(
                "Detailed guidance on how the candidate should answer this question"
            )
        })
    ).describe(
        "Technical interview questions likely to be asked"
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string().describe(
                "A behavioral interview question"
            ),

            intention: z.string().describe(
                "The purpose of asking this behavioral question"
            ),

            answer: z.string().describe(
                "Recommended approach for answering the behavioral question"
            )
        })
    ).describe(
        "Behavioral interview questions likely to be asked"
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string().describe(
                "A missing or weak skill identified from the candidate profile"
            ),

            severity: z.enum([
                "low",
                "medium",
                "high"
            ]).describe(
                "Severity of the skill gap"
            )
        })
    ).describe(
        "Skills that should be improved before the interview"
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number().describe(
                "Day number in the preparation plan"
            ),

            focus: z.string().describe(
                "Primary focus area for the day"
            ),

            tasks: z.array(
                z.string()
            ).describe(
                "Specific tasks to complete on this day"
            )
        })
    ).describe(
        "Day-wise preparation roadmap"
    ),
    title: z.string().describe("The title of the job for which the interview report is generated")
});

export async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {
    if (!process.env.GOOGLE_GENAI_API_KEY) {
        throw new Error(
            "GOOGLE_GENAI_API_KEY is missing"
        );
    }

    const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_GENAI_API_KEY
    });

    const prompt = `
You are an expert technical recruiter.

Resume Content:
${resume || "No resume provided"}

Self Description:
${selfDescription || "Not provided"}

Job Description:
${jobDescription}

Generate:

1. title
2. matchScore
3. summary
4. 10 technicalQuestions
5. 5 behavioralQuestions
6. skillGaps
7. 7-day preparationPlan

Return only valid JSON.
`;

    try {
        const response =
            await ai.models.generateContent({
                model: "gemini-2.5-flash",

                contents: prompt,

                config: {
                    responseMimeType:
                        "application/json",

                    responseSchema:
                        zodToJsonSchema(
                            interviewReportSchema
                        )
                }
            });

        return JSON.parse(response.text);
    } catch (error) {
        console.error(error);
        throw error;
    }
}