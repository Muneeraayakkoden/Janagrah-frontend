// LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function ResidentLogin() {
  return (
    <div>
      <div className="input-group">
        <input type="email" placeholder="Email" className="input-field" />
      </div>
      <div className="input-group">
        <input type="password" placeholder="Password" className="input-field" />
      </div>
      <button type="submit" className="login-btn">Resident Login</button>
      <div className="forgot-password">Forgot Password?</div>
      <button className="register-btn">Register Now</button>
      <Link to="/signup/resident">Register Now</Link>
    </div>
  );
}

function OfficialLogin() {
  return (
    <div>
      <div className="input-group">
        <input type="email" placeholder="Email" className="input-field" />
      </div>
      <div className="input-group">
        <input type="password" placeholder="Password" className="input-field" />
      </div>
      <button type="submit" className="login-btn">Official Login</button>
      <div className="forgot-password">Forgot Password?</div>
      <button className="register-btn">Register Now</button>
    </div>
  );
}

function LoginPage() {
  const [isResident, setIsResident] = useState(true);

  return (
    <div className="LoginPage">
      <div className="login-container">
        <div className="logo-container">
          <img src={logo} alt="Janagrah Logo" className="logo" />
        </div>
        <div className="tabs">
          <div className={`tab ${isResident ? 'active' : ''}`} onClick={() => setIsResident(true)}>
            Resident Login
          </div>
          <div className={`tab ${isResident ? '' : 'active'}`} onClick={() => setIsResident(false)}>
            Official Login
          </div>
        </div>
        <div className="login-form">
          <h2>{isResident ? 'Resident Login' : 'Official Login'}</h2>
          <form>
            {isResident ? <ResidentLogin /> : <OfficialLogin />}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
