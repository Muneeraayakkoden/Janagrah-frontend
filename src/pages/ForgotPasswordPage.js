import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(email);
      const response = await fetch('http://localhost:4000/login/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
        
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMessage('An email has been sent to your address with instructions to reset your password.');
          alert("Check your email for the reset password link.");
          navigate('/');
        } else {
          setMessage(data.message);
        }
      } else {
        setMessage('Failed to submit the request. Please try again later.');
      }
    } catch (error) {
      setMessage('This email is not registered before.');
    }
  };

  return (
    <div className="ForgotPasswordPage">
      <div className="ForgotPasswordPage-container">
        <h2>Forgot Password?</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="submit-btn">Submit</button>
          {message && <p className="msg">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
