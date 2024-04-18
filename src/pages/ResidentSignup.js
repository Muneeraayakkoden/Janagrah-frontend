import React, { useState } from 'react';
import './ResidentSignup.css';

const ResidentSignup = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    gramaPanchayat: '',
    wardNo: '',
    name: '',
    age: '',
    job: '',
    address: '',
    email: '',
    username: '',
    annualIncome: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStateChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, state: value, district: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!formData.name || !formData.email || !formData.username || !formData.password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    
    // Reset form data and show success message
    setFormData({
      state: '',
      district: '',
      gramaPanchayat: '',
      wardNo: '',
      name: '',
      age: '',
      job: '',
      address: '',
      email: '',
      username: '',
      annualIncome: '',
    });
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('Registration successful!');
  };

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const districts = {
    "Kerala": [
      "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam",
      "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta",
      "Thiruvananthapuram", "Thrissur", "Wayanad"
    ]
  };

  return (
    <div className="signup-page">
      <h1>RESIDENT REGISTRATION</h1>
      <form onSubmit={handleSubmit}>
        <section className="location-details">
          <h2>Location Details</h2>
          <select name="state" value={formData.state} onChange={handleStateChange} required>
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <br /><br />
          {formData.state === 'Kerala' ? (
            <select name="district" value={formData.district} onChange={handleChange} required>
              <option value="">Select District</option>
              {districts['Kerala'].map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          ) : (
            <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} required />
          )}
          <br /><br />
          <input type="text" name="LocalGovernment" placeholder="Local Government" value={formData.LocalGovernment} onChange={handleChange} />
          <br /><br />
          <input type="number" name="wardNo" placeholder="Ward No." value={formData.wardNo} onChange={handleChange} required />
          <br /><br />
        </section>
        <section className="personal-details">
          <h2>Personal Details</h2>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <br /><br />
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
          <br /><br />
          <input type="number" name="phone" placeholder="Phone No." value={formData.phone} onChange={handleChange} required />
          <br /><br />
          <input type="text" name="job" placeholder="Job" value={formData.job} onChange={handleChange} />
          <br /><br />
          <input type="number" name="annualIncome" placeholder="Annual Income" value={formData.annualIncome} onChange={handleChange} />
          <br /><br />
          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        </section>
        <section className="account-details">
          <h2>Account Details</h2>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <br /><br />
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <br /><br />
          <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <br /><br />
          <input type="password" name="confirm_password" placeholder="Re-enter Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/> 
          <br /><br />
          <label>Upload image : </label>
          <input type="file" />
        </section>
        <button type="submit">Register</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default ResidentSignup;
