import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResidentHome from './pages/ResidentHome';
import LoginPage from './pages/LoginPage.js';
import ResidentSignup from './pages/ResidentSignup.js';
import ResidentSignupSuccess from './pages/ResidentSignupSuccess.js';
import ContactPage from './pages/ContactPage.js';
import SurveyPage from './pages/SurveyPage.js';
import Notification from './pages/Notification.js';
import LoginRejected from './pages/LoginRejected.js'
import OfficialHome from './pages/OfficialHome.js'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/ContactPage" Component={ContactPage} />
          <Route path="/SurveyPage" Component={SurveyPage} />
          <Route path="/ResidentHome" Component={ResidentHome}/> 
          <Route path="/" Component={LoginPage} />
          <Route path="/ResidentSignup" Component={ResidentSignup} />
          <Route path="/ResidentSignupSuccess" Component={ResidentSignupSuccess} />
          <Route path="/Notification" Component={Notification} />
          <Route path="/LoginRejected" Component={LoginRejected} />
          <Route path='/OfficialHome' Component={OfficialHome} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

    
