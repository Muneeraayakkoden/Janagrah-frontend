import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';


function ResidentLoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleForgotPasswordClick = () => {
    navigate('/ForgotPasswordPage');
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/login/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },   
        body: JSON.stringify({ username, password })
      })   
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.user.username);
        if (data.success) {
         
          localStorage.setItem('userId', JSON.stringify(data.user._id));
          localStorage.setItem('username', JSON.stringify(data.user.username));
          localStorage.setItem('password', JSON.stringify(data.user.password));
          // Login successful, navigate to ResidentHome
          navigate('/ResidentHome');
        } else {
          // Handle other cases of successful response without a token
          console.error('Login failed:', data.message); // Adjust based on server response
          setError('Invalid username or password.');
        }
      } else {
        // Login failed, handle error
        console.error('Login failed:', response.statusText);
        navigate('/LoginRejected');
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      navigate('/LoginRejected');
    }
  };

  return (
    <div>
      <div className="input-group">
        <input type="text" placeholder="Username*" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="input-group">
        <input type="password" placeholder="Password*" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      </div>
      <button type="submit" className="login-btn" onClick={handleLogin}>Resident Login</button>
      <div className="error-message">{error}</div>
      <div><a href="#" className="forgot-password" onClick={handleForgotPasswordClick}>Forgot Password?</a></div>
      <button className="register-btn" onClick={() => {navigate('/ResidentSignup')}}>Register Now</button>
    </div>
  );
}


function OfficialLoginForm() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleForgotPasswordClick = () => {
    navigate('/ForgotPasswordPage');
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/login/wardlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.success) {
          Object.entries(data.data).forEach(([key, value]) => {
            localStorage.setItem(key, JSON.stringify(value));
          });
          navigate('/OfficialHome');
        } else {
          console.error('Login failed:', data.message);
          setError(data.message || 'Login failed');
        }
      } else {
        console.error('Login failed:', response.statusText);
        setError('Failed to log in. Please try again later.');
      }
  
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to log in. Please try again later.');
    }
  };

  return (
    <form>
      <div className="input-group">
        <input type="text" placeholder="Username*" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} required/>
      </div>
      <div className="input-group">
        <input type="password" placeholder="Password*" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="login-btn" onClick={handleLogin}>Official Login</button>
      <div className="error-message">{error}</div>
      <div className="forgot-password" onClick={handleForgotPasswordClick}>Forgot Password?</div>
    </form>
  );
}

function LoginPage() {
  const [selectedTab, setSelectedTab] = useState('resident');
  const handleResidentRegisterClick = async () => {
    console.log('Redirect to resident registration'); 
  }
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
