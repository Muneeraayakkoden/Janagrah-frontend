import React, { useState } from 'react';
import './ResidentSignup.css';
import { useNavigate } from "react-router-dom";

const ResidentSignup = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    localAuthority: '',
    ward: '',
    name: '',
    age: '',
    voterId: '',
    phone: '',
    job: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    annualIncome: '',
    address: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStateSelection = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, state: value, district: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    if (!formData.voterId.match(/[A-Za-z0-9]{10}/)) {
      setErrorMessage('Voter ID must be 10 characters long (alphanumeric).');
      return;
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Check if required fields are filled
    const requiredFields = ['state', 'district', 'localAuthority', 'ward', 'name', 'age', 'voterId', 'phone', 'job', 'email', 'username'];
    const hasEmptyFields = requiredFields.some(field => !formData[field]);
    if (hasEmptyFields) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (parseInt(formData.age) < 18) {
      setErrorMessage('Age must be 18 or older.');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorMessage('Phone number must be 10 digits.');
      return;
    }

    navigate("/ResidentSignupSuccess")
    try {
      console.log(JSON.stringify(formData));
       // Send form data to the backend
      const response = await fetch('https://localhost:4000/user/request-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          state:formData.state,
          district:formData.district,
          localAuthority:formData.localAuthority,
          ward:formData.ward,
          name:formData.name,
          age:formData.age,
          voterId: formData.voterId,
          phone:formData.phone,
          job:formData.job,
          address:formData.address,
          email:formData.email,
          username:formData.username,
          password:formData.password,

          annualIncome:formData.annualIncome
        }),
        
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Handle success response
      const responseData = await response.json();
      console.log("Response Data:", responseData); // Log response data
  
      // Reset form data and show success message
      setFormData({
        state: '',
        district: '',
        localAuthority: '',
        ward: '',
        name: '',
        age: '',
        voterId: '',
        phone: '',
        job: '',
        email: '',
        username: '',
        password: '' ,
        confirmPassword: '',
        address: '',
        annualIncome:''
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

  const localAuthorities = {
    "Palakkad": [
      "AGALI", "AKATHETHARA", "ALANALLUR", "ALATHUR", "AMBALAPARA", "ANAKKARA", "ANANGANADI", "AYILUR", "CHALAVARA", "CHALISSERI",
      "COYALAMMANAM", "ELAPPULLY", "ELEVANCHERY", "ERIMAYUR", "ERUTHEMPATHY", "KADAMPAZHIPURAM", "KANHIRAPUZHA", "KANNADI", "KANNAMBRA",
      "KAPPUR", "KARAKURUSSI", "KARIMPUZHA", "KAVASSERI", "KERALASSERY", "KIZHAKKANCHERY", "KODUMBA", "KODUVAYUR", "KOLLENGODE", "KONGAD",
      "KOPPAM", "KOTTOPPADAM", "KOTTAYI", "KOZHINJAMPARA", "KARIMBA", "KULUKKALLUR", "KUMARAMPUTHUR", "KUTHANUR", "LAKKIDI PERUR", "MALAMPUZHA",
      "MANKARA", "MANNUR", "MARUTHARODE", "MATHUR", "MUTHUTHALA", "MELARCODE", "MUNDUR", "MUTHALAMADA", "NAGALASSERI", "NALLEPPILLY", "NELLAYA",
      "NELLIAMPATHY", "NEMMARA", "ONGALLUR", "PALLASSANA", "POOKKOTTUKAVU", "PARUTHUR", "PARALI", "PATTITHARA", "PATTANCHERY", "PERUMATTY",
      "PERUNGOTTUKURUSSI", "PERUVEMBA", "PIRAYIRI", "POLPULLY", "PUDUCODE", "PUDUNAGARAM","PUDUPPARIYARM", "PUDUR", "PUDUSSERI",  "SHOLAYUR",
      "SREEKRISHNAPURAM", "TARUR", "THACHAMPARA", "THACHANATTUKARA", "THENKURUSSI", "THIRUMITTACODE", "THIRUVEGAPURA", "TRIKKADIRI", "THRITHALA",
      "VADAKKANCHERY", "VADAKARAPATHY","VADAVANNUR", "VALLAPUZHA", "VANDAZHY", "VANIAMKULAM", "VELLINEZHI", "VILAYUR",  "PALAKKAD", "CHITTUR-TATTAMANGALAM", 
      "MANNARKKAD", "CHERPULASSERY", "OTTAPPALAM", "SHORANUR", "PATTAMBI"
    ]
  };

  const wardNo = {
    "SREEKRISHNAPURAM": [
      "1", "2", "3", "4", "5", "6", "7", 
      "8", "9", "10", "11", "12", "13", "14"
    ]
  };

  const jobs = [
    "Student", "Farmer", "Teacher", "Doctor", "Housewife", "Fisherman", "Engineer", "Nurse", "Sportsman", "Coach", "Business", "Sales Officer",
    "Manager", "Bike Rider", "Receptionist", "Pharmacist", "Others"
  ];
  
  return (
    <div className="signup-page">
      <h1>RESIDENT REGISTRATION</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Location Details</h2>
          <select name="state" value={formData.state}  onChange={handleStateSelection} required>
            <option value="">Select State*</option>
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
            <input type="text" name="district" placeholder="District*" value={formData.district} onChange={handleChange} required />
          )}
          <br /><br />
          {formData.district === 'Palakkad' ? (
            <select name="localAuthority" value={formData.localAuthority} onChange={handleChange} required>
              <option value="">Select Local-Authority</option>
              {localAuthorities['Palakkad'].map(localAuthority => (
                <option key={localAuthority} value={localAuthority}>{localAuthority}</option>
              ))}
            </select>
          ) : (
            <input type="text" name="localAuthority" placeholder="Local-Authority*" value={formData.localAuthority} onChange={handleChange} required />
          )}
          <br /><br />

          {formData.localAuthority === 'SREEKRISHNAPURAM' ? (
            <select name="ward" value={formData.wardNo} onChange={handleChange} required>
              <option value="">Select Ward</option>
              {wardNo['SREEKRISHNAPURAM'].map(wardNo => (
                <option key={wardNo} value={wardNo}>{wardNo}</option>
              ))}
            </select>
          ) : (
            <input type="text" name="ward" placeholder="Ward No.*" value={formData.ward} onChange={handleChange} required />
          )}
          <br /><br />
        </div>
        <div className="form-section">
          <h2>Personal Details</h2>
          <input type="text" name="name" placeholder="Name*" value={formData.name} onChange={handleChange} required />
          <br /><br />
          <input type="number" name="age" placeholder="Age*" value={formData.age} onChange={handleChange} required />
          <br /><br />
          <input type="text" name="voterId" placeholder="Voter ID*" value={formData.voterId} onChange={handleChange}  required />
          <br /><br />
          <input type="number" name="phone" placeholder="Phone No.*" value={formData.phone} onChange={handleChange} required />
          <br /><br />
          <select name="job" value={formData.job}  onChange={handleChange} required>
            <option value="">Job*</option>
            {jobs.map(job => (
              <option key={job} value={job}>{job}</option>
            ))}
          </select>
          <br /><br />
          <input type="number" name="annualIncome" placeholder="Annual Income" value={formData.annualIncome} onChange={handleChange} />
          <br /><br />
          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="form-section">
          <h2>Account Details</h2>
          <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required />
          <br /><br />
          <input type="text" name="username" placeholder="Username*" value={formData.username} onChange={handleChange} required />
          <br /><br />
          <input type="password" name="password" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <br /><br />
          <input type="password" name="confirmPassword" placeholder="Re-enter Password*" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /> 
          <br /><br />
        </div>
        <button type="submit">Register</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} 
      </form>
    </div>
  );
}

export default ResidentSignup;
