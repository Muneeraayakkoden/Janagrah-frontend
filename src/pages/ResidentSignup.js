import React, { useState } from 'react';
import './ResidentSignup.css';
import { useNavigate } from "react-router-dom";

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
    console.log(event.target)
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
    const requiredFields = ['name', 'email', 'username', 'password', 'confirm_password'];
    const hasEmptyFields = requiredFields.some(field => !formData[field]);
    if (hasEmptyFields) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    navigate("/ResidentSignupSuccess")
    try {
      console.log(JSON.stringify(formData));
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

      if (!response.ok) {
        throw new Error('Network response was not ok');
       // navigate("/ResidentSignupSuccess")
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
    } 
    catch (error) {
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

  const Ward = {
    "SREEKRISHNAPURAM": [
      "1", "2", "3", "4", "5", "6", "7", 
      "8", "9", "10", "11", "12", "13", "14"
    ]
  };
  
  return (
    <div className="signup-page">
      <h1>RESIDENT REGISTRATION</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
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
            <select name="ward" value={formData.ward} onChange={handleChange} required>
              <option value="">Select Ward</option>
              {Ward['SREEKRISHNAPURAM'].map(ward => (
                <option key={ward} value={ward}>{ward}</option>
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
          <input type="number" name="phone" placeholder="Phone No.*" value={formData.phone} onChange={handleChange} required />
          <br /><br />
          <select name="job" id="job" required>
            <option value="">Select a Job</option>
            <option value="student">Student</option>
            <option value="farmer">Farmer</option>
            <option value="teacher">Teacher</option>
            <option value="doctor">Doctor</option>
            <option value="housewife">Housewife</option>
            <option value="fisherman">Fisherman</option>
            <option value="engineer">Engineer</option>
            <option value="nurse">Nurse</option>
            <option value="sportsman">Sportsman</option>
            <option value="coach">Coach</option>
            <option value="business">Business</option>
            <option value="sales officer">Sales Officer</option>
            <option value="manager">Manager</option>
            <option value="bike rider">Bike Rider</option>
            <option value="receptionist">Receptionist</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="others">Others</option>
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
          <input type="password" name="confirm_password" placeholder="Re-enter Password*" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /> 
          <br /><br />
          <label>Upload image : </label>
          <input type="file" />
        </div>
        <button type="submit" onClick={handleSubmit}>Register</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} 
      </form>
    </div>
  );
}

export default ResidentSignup;
