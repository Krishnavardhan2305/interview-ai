import { useState } from "react";
import "./Interview.scss";
import { useInterview } from "../hook/useinterview.js";
import { useParams } from "react-router-dom";
const Interview = () => {
    const [activeTab, setActiveTab] = useState("technical");

    const { report } = useInterview();
    const { interviewId } = useParams();

    if (!report) {
        return (
            <div className="loading">
                Loading Interview Report...
            </div>
        );
    }
    return (
        <div className="result-page">

            <div className="sidebar">
                <h3>Sections</h3>

                <button
                    className={activeTab === "technical" ? "active" : ""}
                    onClick={() => setActiveTab("technical")}
                >
                    Technical Questions
                </button>

                <button
                    className={activeTab === "behavioral" ? "active" : ""}
                    onClick={() => setActiveTab("behavioral")}
                >
                    Behavioral Questions
                </button>

                <button
                    className={activeTab === "roadmap" ? "active" : ""}
                    onClick={() => setActiveTab("roadmap")}
                >
                    Preparation Plan
                </button>

                <button
                    className={activeTab === "summary" ? "active" : ""}
                    onClick={() => setActiveTab("summary")}
                >
                    Summary
                </button>
            </div>

            <div className="content">

                {activeTab === "summary" && (
                    <div className="summary-card">
                        <h2>Profile Summary</h2>
                        <p>{report.summary}</p>
                    </div>
                )}

                {activeTab === "technical" && (
                    <>
                        <h2>Technical Questions</h2>

                        {report?.technicalQuestions?.map((q, index) => (
                            <details key={index} className="question-card">
                                <summary>
                                    Q{index + 1}. {q.question}
                                </summary>

                                <div className="answer-section">
                                    <h4>Why interviewer asks this?</h4>
                                    <p>{q.intention}</p>

                                    <h4>Suggested Answer</h4>
                                    <p>{q.answer}</p>
                                </div>
                            </details>
                        ))}
                    </>
                )}

                {activeTab === "behavioral" && (
                    <>
                        <h2>Behavioral Questions</h2>

                        {report?.behavioralQuestions?.map((q, index) => (
                            <details key={index} className="question-card">
                                <summary>
                                    Q{index + 1}. {q.question}
                                </summary>

                                <div className="answer-section">
                                    <h4>Purpose</h4>
                                    <p>{q.intention}</p>

                                    <h4>Suggested Answer</h4>
                                    <p>{q.answer}</p>
                                </div>
                            </details>
                        ))}
                    </>
                )}

                {activeTab === "roadmap" && (
                    <>
                        <h2>7 Day Preparation Plan</h2>

                        {report?.preparationPlan?.map((day) => (
                            <div
                                className="roadmap-card"
                                key={day.day}
                            >
                                <h3>Day {day.day}</h3>

                                <h4>{day.focus}</h4>

                                <ul>
                                    {day.tasks.map((task, i) => (
                                        <li key={i}>{task}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                )}

            </div>

            <div className="analytics">

                <div className="score-card">
                    <h3>Match Score</h3>

                    <div className="score-circle">
                        {report.matchScore}%
                    </div>
                </div>

                <div className="skill-gap-card">
                    <h3>Skill Gaps</h3>

                    {report.skillGaps.map((skill, index) => (
                        <span
                            key={index}
                            className={`badge ${skill.severity}`}
                        >
                            {skill.skill}
                        </span>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default Interview;