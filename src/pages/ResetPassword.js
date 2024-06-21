// src/components/ResetPassword.js

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();  // For redirecting after successful reset
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validatePassword = (password) => {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordCriteria.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (!validatePassword(newPassword)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    
    if (newConfirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError || confirmPasswordError) {
      setMessage('Please fix the errors before submitting');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/login/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log('error');
        throw new Error(errorData.message || 'Failed to reset password');
        
      }
      if (response.ok) {
        const data = await response.json();
        if(data.success){
          setMessage('Password reset successfully');
          // Redirect to login or another page after successful reset
          navigate('/'); // Redirect to login page after successful password reset
        } else {
          setMessage('Error resetting password');
        }
      } else {
        setMessage('Error resetting password');
      }
    } catch (error) {
      setMessage('Error     resetting password');
    }
  };

  return (
    <div className="reset-password-container">
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
        </div>
        {message && <p className="message">{message}</p>}
        <button className='resetbutton' type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;

