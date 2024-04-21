// ForgotPasswordPage.js

import React, { useState } from 'react';
import './ForgotPasswordPage.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/forgot-password', {
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
        } else {
          setMessage(data.message);
        }
      } else {
        setMessage('Failed to submit the request. Please try again later.');
      }
    } catch (error) {
      setMessage('There was a problem with your request. Please try again later.');
    }
  };

  return (
    <div className="ForgotPasswordPage">
      <h2>Forgot Password ?</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="email" placeholder="Enter your email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default ForgotPasswordPage;
