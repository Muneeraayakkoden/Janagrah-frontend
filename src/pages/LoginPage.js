import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../assets/logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function ResidentLoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
          localStorage.setItem('wardmemberid', JSON.stringify(data.user.wardmemberid));
          localStorage.setItem('job', JSON.stringify(data.user.job));
          localStorage.setItem('state', JSON.stringify(data.user.state));
          localStorage.setItem('district', JSON.stringify(data.user.district));
          localStorage.setItem('localAuthority', JSON.stringify(data.user.localAuthority));
          localStorage.setItem('ward', JSON.stringify(data.user.ward));
          localStorage.setItem('name', JSON.stringify(data.user.name));
          localStorage.setItem('age', JSON.stringify(data.user.age));
          localStorage.setItem('phone', JSON.stringify(data.user.phone));
          localStorage.setItem('address', JSON.stringify(data.user.address));
          localStorage.setItem('email', JSON.stringify(data.user.email));
          localStorage.setItem('voterId', JSON.stringify(data.user.voterId));
          localStorage.setItem('annualIncome', JSON.stringify(data.user.annualIncome));


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


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="input-group">
        <input type="text" placeholder="Username*" className="form-control form-control-custom " value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="input-group">
        <input type={showPassword ? 'text' : 'password'} placeholder="Password*" className="form-control form-control-custom" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <span className="password-toggle" onClick={togglePasswordVisibility}> {showPassword ? <FaEyeSlash /> : <FaEye />} </span>
      </div>
      <div><a href="#" className="forgot-password" onClick={handleForgotPasswordClick}>Forgot Password?</a></div>
      <div className="button-container">
        <button className="register-btn" onClick={() => {navigate('/ResidentSignup')}}><i class="fas fa-user-plus"></i> Register</button>
        <button className="login-buttn" onClick={handleLogin}><i class="fas fa-sign-in-alt"></i> Login </button>
        <div className="error-message">{error}</div>
      </div>
    </div>
  );
}


function OfficialLoginForm() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="input-group">
        <input type="text" placeholder="Username*" className="form-control form-control-custom" value={username} onChange={(e) => setUsername(e.target.value)} required/>
      </div>
      <div className="input-group">
        <input type={showPassword ? 'text' : 'password'} placeholder="Password*" className="form-control form-control-custom" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <span className="password-toggle" onClick={togglePasswordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <div><a href="#" className="forgot-password" onClick={handleForgotPasswordClick}>Forgot Password?</a></div>
      <div className="button-container">
        <button  className="login-buttn" onClick={handleLogin}><i class="fas fa-sign-in-alt"></i> Login</button>
        <div className="error-message">{error}</div>
      </div>
    </div>
  );
}

function LoginPage() {
  const [selectedTab, setSelectedTab] = useState('resident');

  const handleResidentRegisterClick = async () => {
    console.log('Redirect to resident registration'); 

  }

  return (
    <div className="LoginPage">
      <div className="background-image1"></div>
      <div className="login-container">
        <div className="logo-container">
          <img src={logo} alt="Janagrah Logo" className="logo img-fluid" />
          <h6>JANAGRAH</h6>
        </div>
        <div className="tabs">
          <div className={`tab ${selectedTab === 'resident' ? 'active' : ''}`} onClick={() => setSelectedTab('resident')}>
          <i class="fas fa-user"></i> RESIDENT
          </div>
          <div className={`tab ${selectedTab === 'official' ? 'active' : ''}`} onClick={() => setSelectedTab('official')}>
          <i class="fas fa-user-tie"></i> OFFICIAL
          </div>
        </div>
        <div className="login-form">
          {selectedTab === 'resident' ? <ResidentLoginForm  onRegisterClick={handleResidentRegisterClick} /> : <OfficialLoginForm  />}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;