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
import UserRequests from './pages/UserRequests.js';
import Dosurvey from './pages/dosurvey.js';
import Announcements from './pages/AnnoucementHistory.js';
import MemberAccount from './pages/MemberAccount.js';
import WardMessage from './pages/WardMessage.js';
import AllResidents from './pages/AllResidents.js';
import Homepage from './pages/Homepage.js';
import EditProfile from './pages/EditProfile.js';
import Officialside from './components/Officialside.js';
import Surveyboth from './pages/Surveyboth.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Homepage} />
          <Route path="/ContactPage" Component={ContactPage} />
          <Route path="/SurveyPage" Component={SurveyPage} />
          <Route path="/ResidentHome" Component={ResidentHome} /> 
          <Route path="/ResidentSignup" Component={ResidentSignup} />
          <Route path="/LoginPage" Component={LoginPage} />
          <Route path="/ResidentSignupSuccess" Component={ResidentSignupSuccess} />
          <Route path="/LoginRejected" Component={LoginRejected} />
          <Route path="/OfficialHome" Component={OfficialHome} />
          <Route path="/CreateAnnouncement" Component={CreateAnnouncement} />
          <Route path="/CreateSurveys" Component={CreateSurveys} />
          <Route path="/Results" Component={Results} />
          <Route path="/ForgotPasswordPage" Component={ForgotPasswordPage} />
          <Route path="/OfficialNotification" Component={OfficialNotification} />
          <Route path="/MyAccount" Component={MyAccount} />
          <Route path="/EditProfile" Component={EditProfile} />
          <Route path="/UserRequests" Component={UserRequests} />
          <Route path="/WardMessage" Component={WardMessage} />          
          <Route path="/dosurvey" Component={Dosurvey} />
          <Route path="/AnnouncementHistory" Component={Announcements} />
          <Route path="/MemberAccount" Component={MemberAccount} />
          <Route path="/AllResidents" Component={AllResidents} />
          <Route path="/Homepage" Component={Homepage} />
          <Route path="/Officialside" Component={Officialside} />
          <Route path="/Surveyboth" Component={Surveyboth} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



    
