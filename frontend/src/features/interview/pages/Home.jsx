import React, {
    useState,
    useRef,
    useEffect
} from "react";
import { FiLogOut } from "react-icons/fi";
import { useInterview } from "../hook/useinterview";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
const Home = () => {
    const {
        loading,
        generateReport,
        reports,
        getReports
    } = useInterview();

    const navigate = useNavigate();
    const { handleLogout } = useAuth();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const totalReports = reports?.length || 0;
    const logoutUser = async () => {
        await handleLogout();
        navigate("/login");
    };
    const averageScore =
        totalReports > 0
            ? Math.round(
                reports.reduce(
                    (sum, report) =>
                        sum + report.matchScore,
                    0
                ) / totalReports
            )
            : 0;

    const highestScore =
        totalReports > 0
            ? Math.max(
                ...reports.map(
                    (report) =>
                        report.matchScore
                )
            )
            : 0;
    const resumeInputRef = useRef(null);

    useEffect(() => {
        getReports();
        console.log("HOME REPORTS:", reports);
    }, []);

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

        const data = await generateReport(
            jobDescription,
            selfDescription,
            resumeFile
        );

        if (!data) {
            alert("Failed to generate report");
            return;
        }

        navigate(`/interview/${data._id}`);
    };

    return (
        <div className="home">
            <div className="top-navbar">
                <button
                    className="logout-btn"
                    onClick={logoutUser}
                >
                    <FiLogOut />
                    Logout
                </button>
            </div>
            <div className="hero">
                <h1>
                    Create Your Custom
                    <span> Interview Plan</span>
                </h1>

                <p>
                    Let our AI analyze the job requirements
                    and your unique profile to build a
                    winning strategy.
                </p>
            </div>
            <div className="analytics-cards">

                <div className="analytics-card">
                    <h3>Total Interviews</h3>
                    <span>{totalReports}</span>
                </div>

                <div className="analytics-card">
                    <h3>Average Score</h3>
                    <span>{averageScore}%</span>
                </div>

                <div className="analytics-card">
                    <h3>Best Match</h3>
                    <span>{highestScore}%</span>
                </div>

            </div>

            <div className="planner-card">
                <div className="left-panel">
                    <div className="section-header">
                        Target Job Description
                    </div>

                    <textarea
                        value={jobDescription}
                        onChange={(e) =>
                            setJobDescription(
                                e.target.value
                            )
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

            <div className="recent-interviews">
                <h2>Recent Interviews</h2>

                {reports?.length > 0 ? (
                    reports
                        .slice(0, 5)
                        .map((report) => (
                            <div
                                key={report._id}
                                className="interview-item"
                                onClick={() =>
                                    navigate(
                                        `/interview/${report._id}`
                                    )
                                }
                            >
                                <h3>{report.title}</h3>

                                <p className="date">
                                    {new Date(
                                        report.createdAt
                                    ).toLocaleDateString()}
                                </p>

                                <p className="summary-preview">
                                    {report.summary?.length > 120
                                        ? report.summary.slice(0, 120) + "..."
                                        : report.summary}
                                </p>

                                <div className="score">
                                    {
                                        report.matchScore
                                    }
                                    %
                                </div>
                            </div>
                        ))
                ) : (
                    <div className="empty-state">
                        No interviews generated yet
                    </div>
                )}
            </div>
        </div >
    );
};

export default Home;