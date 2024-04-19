import React from 'react';
//import ResidentHome from './pages/ResidentHome';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import  LoginPage from './pages/LoginPage.js';
import ResidentSignup from './pages/ResidentSignup.js';
import ResidentSignupSuccess from './pages/ResidentSignupSuccess.js';

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LoginPage} />
          <Route path="/ResidentSignup" Component={ResidentSignup} />
          <Route path="/ResidentSignupSuccess" Component={ResidentSignupSuccess} />
        </Routes>
      </BrowserRouter>
    
    </>
  );
}

export default App;

    
