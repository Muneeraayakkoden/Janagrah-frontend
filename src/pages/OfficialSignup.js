import React, { useState } from 'react';
import './OfficialSignup.css';

const OfficialSignup = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    department: '',
    designation: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!formData.name || !formData.email || !formData.username || !formData.password || !formData.department || !formData.designation) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    
    // Perform verification process (e.g., send verification email)
    // Once verified, store official data in database and show success message
    setFormData({
      name: '',
      email: '',
      username: '',
      password: '',
      department: '',
      designation: '',
    });
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('Verification email sent. Please check your inbox to complete the signup process.');
  };

  return (
    <div className="signup-page">
      <h1>OFFICIAL SIGNUP</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <br />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <br />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <input type="password" name="confirm_password" placeholder="Re-enter Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/> 
        <br />
        <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
        <br />
        <input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} required />
        <br />
        <button type="submit">Sign Up</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default OfficialSignup;
