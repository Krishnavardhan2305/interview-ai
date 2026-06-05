import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./features/auth/auth.context";
import { InterviewProvider } from "./features/interview/interview.context";

import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Home from './features/interview/pages/Home';
import Interview from './features/interview/pages/interview';

import Protected from "./features/auth/components/Protected";

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />} /> 
            <Route path="/" element={
                <Protected>
                  <Home />
                </Protected>
              }
            />

            <Route path="/interview/:interviewId" element={
                <Protected>
                  <Interview />
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
      </InterviewProvider>
    </AuthProvider>
  );
};

export default App;