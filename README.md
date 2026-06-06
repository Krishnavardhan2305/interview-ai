# AI Interview Analysis and Preparation Platform

An AI-powered interview  platform built using the MERN Stack and Google Gemini AI. The platform analyzes a candidate's resume and job description to generate personalized interview preparation reports, including skill gap analysis, interview questions, match score evaluation, and a structured preparation roadmap.

## Features

### Authentication & Security

* User Registration and Login
* JWT-based Authentication
* Protected Routes
* Secure Cookie-based Sessions
* Logout Functionality
* Token Blacklisting

### Resume Analysis

* PDF Resume Upload
* Resume Text Extraction
* Resume-Based Candidate Profiling

### AI-Powered Interview Preparation

* Job Description Analysis
* Resume vs Job Description Matching
* Match Score Generation
* Personalized Summary
* Technical Interview Questions
* Behavioral Interview Questions
* Skill Gap Detection
* 7-Day Preparation Plan

### Dashboard Features

* Interview History
* Match Score Analytics
* Best Match Tracking
* Average Score Tracking
* Recent Interview Reports

## Tech Stack

### Frontend

* React.js
* React Router DOM
* SCSS
* Axios
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* Cookie Parser
* bcrypt

### AI Integration

* Google Gemini API

### File Handling

* Multer
* PDF Parsing

## Project Structure

```bash
client/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   └── interview/
│   ├── App.jsx
│   └── main.jsx

server/
├── controller/
├── models/
├── routes/
├── middleware/
├── services/
├── config/
└── server.js
```

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/ai-interview-platform.git
cd ai-interview-platform
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Workflow

1. User registers or logs in.
2. User uploads a resume or enters a self-description.
3. User provides a target job description.
4. AI analyzes the profile and job requirements.
5. System generates:

   * Match Score
   * Profile Summary
   * Technical Questions
   * Behavioral Questions
   * Skill Gap Analysis
   * 7-Day Preparation Plan
6. Reports are stored in MongoDB.
7. Users can revisit previous reports from the dashboard.



Built as a full-stack AI application to help students and job seekers prepare for interviews more effectively.
