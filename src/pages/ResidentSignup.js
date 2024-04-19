import React, { useState } from 'react';
import './ResidentSignup.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const ResidentSignup = () => {
  const navigate = useNavigate()
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Check if required fields are filled
    if (!formData.name || !formData.email || !formData.username || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Add password to form data
  

    // Convert form data to a URL-encoded string
    

    try {
      // Send form data to the backend
      const response = await fetch('http://localhost:4000/user/request-user', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          state:formData.state,
          district:formData.district,
          localgovernment:formData.LocalGovernment,
          wardNo:formData.wardNo,
          name:formData.name,
          age:formData.age,
          phone:formData.phone,
          job:formData.job,
          address:formData.address,
          email:formData.email,
          username:formData.state,
          password:password,
          annualIncome:formData.annualIncome
          
        }),
        
      });
      navigate("/ResidentSignupSuccess")

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Reset form data and show success message
      setFormData({
        state: '',
        district: '',
        LocalGovernment: '',
        wardNo: '',
        name: '',
        age: '',
        phone:'',
        job: '',
        address: '',
        email: '',
        username: '',
        annualIncome: '',
      });
      setPassword('');
      setConfirmPassword('');
      setErrorMessage('Registration successful!');
    } catch (error) {
      // Handle fetch error
      console.error('There was a problem with your fetch operation:', error);
    }
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
