import axios from "axios";

const api=axios.create({
    baseURL:'http://localhost:5000',
    withCredentials:true
})

// interviewapi.js

export const generateInterviewReport = async (
    jobDescription,
    selfDescription,
    resumeFile
) => {
    try {
        const formData = new FormData();

        if (resumeFile) {
            formData.append("resume", resumeFile);
        }

        formData.append("selfDescription", selfDescription);
        formData.append("jobDescription", jobDescription);

        const response = await api.post(
            "/api/interview",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error generating interview report:", error);
        throw error;
    }
};

export const getInterviewReportById=async(interviewId)=>{
    try {
        const response=await api.get(`/api/interview/report/${interviewId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching interview report:",error);
        throw error;
    }
}

export const getAllInterviewReports=async()=>{
    try {
        const response=await api.get("/api/interview/");
        return response.data;
    } catch (error) {
        console.error("Error fetching interview reports:",error);
        throw error;
    }
}
