import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';



function ResidentLoginForm({ onRegisterClick }) {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Send form data to the backend
    } catch (error) {
      // Handle fetch error
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  return (
    <div>
      <div className="input-group">
        <input type="text" placeholder="Username" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="input-group">
        <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      </div>
      <button type="submit" className="login-btn" onClick={handleLogin}>Resident Login</button>
      <div className="forgot-password">Forgot Password?</div>
      <button className="register-btn" onClick={() => {
        navigate('/ResidentSignup');
      }}>Register Now</button>

    </div>
  );
}

function OfficialLoginForm({ onRegisterClick }) {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

 
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Send form data to the backend
    } catch (error) {
      // Handle fetch error
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  return (
    <form>
      
      <div className="input-group">
        <input type="text" placeholder="username" className="input-field" value={username} onChange={(e) => setusername(e.target.value)} required/>
      </div>
      <div className="input-group">
        <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="login-btn" onClick={handleLogin}>Official Login</button>
      <div className="forgot-password">Forgot Password?</div>

    </form>
  );
}

function LoginPage() {
  const [selectedTab, setSelectedTab] = useState('resident');

  const handleResidentRegisterClick = () => {
    console.log('Redirect to resident registration');
    // Implement redirection logic
  };

  return (
    <div className="LoginPage">
      <div className="login-container">
        <div className="logo-container">
          <img src={logo} alt="Janagrah Logo" className="logo" />
        </div>
        <div className="tabs">
          <div className={`tab ${selectedTab === 'resident' ? 'active' : ''}`} onClick={() => setSelectedTab('resident')}>
            Resident Login
          </div>
          <div className={`tab ${selectedTab === 'official' ? 'active' : ''}`} onClick={() => setSelectedTab('official')}>
            Official Login
          </div>
        </div>
        <div className="login-form">
          <h2>{selectedTab === 'resident' ? 'Resident Login' : 'Official Login'}</h2>
          {selectedTab === 'resident' ? <ResidentLoginForm onRegisterClick={handleResidentRegisterClick} /> : <OfficialLoginForm  />}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
