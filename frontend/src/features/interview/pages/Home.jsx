import React, { useState, useRef } from "react";
import { useInterview } from "../hook/useinterview";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const { loading, generateReport } = useInterview();
    const navigate = useNavigate();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resumeFile, setResumeFile] = useState(null);

    const resumeInputRef = useRef(null);

    const handleSubmit = async () => {
        if (!jobDescription.trim()) {
            alert("Please enter Job Description");
            return;
        }

        if (!resumeFile && !selfDescription.trim()) {
            alert(
                "Please upload a resume or provide a self description"
            );
            return;
        }

        const data=await generateReport(
            jobDescription,
            selfDescription,
            resumeFile
        );
        navigate(`/interview/${data._id}`);
    };

    return (
        <div className="home">
            <div className="hero">
                <h1>
                    Create Your Custom
                    <span> Interview Plan</span>
                </h1>

                <p>
                    Let our AI analyze the job requirements and
                    your unique profile to build a winning strategy.
                </p>
            </div>

            <div className="planner-card">
                <div className="left-panel">
                    <div className="section-header">
                        Target Job Description
                    </div>

                    <textarea
                        value={jobDescription}
                        onChange={(e) =>
                            setJobDescription(e.target.value)
                        }
                        placeholder="Paste the full job description here..."
                    />
                </div>

                <div className="right-panel">
                    <div className="section-header">
                        Your Profile
                    </div>

                    <div
                        className="upload-box"
                        onClick={() =>
                            resumeInputRef.current.click()
                        }
                    >
                        <input
                            ref={resumeInputRef}
                            type="file"
                            accept=".pdf"
                            hidden
                            onChange={(e) =>
                                setResumeFile(
                                    e.target.files[0]
                                )
                            }
                        />

                        <p>
                            {resumeFile
                                ? resumeFile.name
                                : "Upload Resume"}
                        </p>
                    </div>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <textarea
                        value={selfDescription}
                        onChange={(e) =>
                            setSelfDescription(
                                e.target.value
                            )
                        }
                        placeholder="Briefly describe your experience, projects and skills..."
                    />

                    <div className="info-box">
                        Either a Resume or a Self Description
                        is required.
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading
                            ? "Generating..."
                            : "Generate Interview Strategy"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;