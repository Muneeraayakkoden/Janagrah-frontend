import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import other page components

import ResidentHome from './pages/ResidentHome';
import LoginPage from './pages/LoginPage.js';
import ResidentSignup from './pages/ResidentSignup.js';
import ResidentSignupSuccess from './pages/ResidentSignupSuccess.js';
import ContactPage from './pages/ContactPage.js';
import SurveyPage from './pages/SurveyPage.js';
import LoginRejected from './pages/LoginRejected.js';
import OfficialHome from './pages/OfficialHome.js';
import CreateAnnouncement from './pages/CreateAnnouncement.js';
import Results from './pages/Results.js';
import CreateSurveys from './pages/CreateSurveys.js';
import ForgotPasswordPage from './pages/ForgotPasswordPage.js';
import OfficialNotification from './pages/officialNotification.js';
import MyAccount from './pages/MyAccount.js';
import EditProfile from './pages/EditProfile.js';
import UserRequests from './pages/UserRequests.js';
import Dosurvey from './pages/dosurvey.js';
import Announcements from './pages/Annoucements.js';
import MemberAccount from './pages/MemberAccount.js';
import WardMessage from './pages/WardMessage.js';
import AllResidents from './pages/AllResidents.js';
import Homepage from './pages/Homepage.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/SurveyPage" element={<SurveyPage />} />
          <Route path="/ResidentHome" element={<ResidentHome />} /> 
          <Route path="/ResidentSignup" element={<ResidentSignup />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/ResidentSignupSuccess" element={<ResidentSignupSuccess />} />
          <Route path="/LoginRejected" element={<LoginRejected />} />
          <Route path="/OfficialHome" element={<OfficialHome />} />
          <Route path="/CreateAnnouncement" element={<CreateAnnouncement />} />
          <Route path="/CreateSurveys" element={<CreateSurveys />} />
          <Route path="/Results" element={<Results />} />
          <Route path="/ForgotPasswordPage" element={<ForgotPasswordPage />} />
          <Route path="/OfficialNotification" element={<OfficialNotification />} />
          <Route path="/MyAccount" element={<MyAccount />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/UserRequests" element={<UserRequests />} />
          <Route path="/WardMessage" element={<WardMessage />} />          
          <Route path="/dosurvey" element={<Dosurvey />} />
          <Route path="/Announcements" element={<Announcements />} />
          <Route path="/MemberAccount" element={<MemberAccount />} />
          <Route path="/AllResidents" element={<AllResidents />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


    
