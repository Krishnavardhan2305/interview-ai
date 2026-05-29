import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from "./features/auth/auth.context";
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
