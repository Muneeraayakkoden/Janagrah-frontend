import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';



function ResidentLoginForm({ onRegisterClick }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Resident login with email:', email, 'and password:', password);
    // Implement login logic
  };

  return (
    <div>
      <div className="input-group">
        <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-group">
        <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Official login with email:', email, 'and password:', password);
    // Implement login logic
  };

  return (
    <div>
      <div className="input-group">
        <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-group">
        <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className="login-btn" onClick={handleLogin}>Official Login</button>
      <div className="forgot-password">Forgot Password?</div>
    </div>
  );
}

function LoginPage() {
  const [selectedTab, setSelectedTab] = useState('resident');

  const handleResidentRegisterClick = () => {
    console.log('Redirect to resident registration');
    // Implement redirection logic
  };

  const handleOfficialRegisterClick = () => {
    console.log('Redirect to official registration');
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
          {selectedTab === 'resident' ? <ResidentLoginForm onRegisterClick={handleResidentRegisterClick} /> : <OfficialLoginForm onRegisterClick={handleOfficialRegisterClick} />}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
