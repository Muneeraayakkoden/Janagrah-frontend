import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage.js';
import ResidentSignup from './pages/ResidentSignup.js';
import ResidentSignupSuccess from './pages/ResidentSignupSuccess.js';
import OfficialHome from './pages/OfficialHome.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ResidentSignup" element={<ResidentSignup />} />
        <Route path="/ResidentSignupSuccess" element={<ResidentSignupSuccess />} />
        <Route path="/OfficialHome" element={<OfficialHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
