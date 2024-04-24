import React, { useState } from 'react';
import './ResidentSignup.css';
import { useNavigate } from "react-router-dom";

const ResidentSignup = () => {
  const navigate = useNavigate();
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

  const [errorMessage, setErrorMessage] = useState({
    district: '',
    localAuthority: '',
    ward: '',
    name: '',
    age: '',
    voterId: '',
    phone: '',
    confirmPassword: '',
    annualIncome: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    let errorMessage = '';
  
    // Validation rules for each field
    switch (name) {
      case 'district':
      case 'localAuthority':
      case 'name':
        if (!/^[a-zA-Z]+$/.test(value)) {
          errorMessage = 'Field must contain only alphabets.';
        }
        break;
      case 'ward':
        if (!/^[1-9]\d*$/.test(value)) {
          errorMessage = 'Ward must be a number greater than 0.';
        }
        break;
      case  'age':
        if (parseInt(value) < 18) {
          errorMessage = 'Age must be 18 or older.';
        }
        break;
      case 'voterId':
        if (!/^[a-zA-Z0-9]{10}$/.test(value)) {
          errorMessage = 'Voter ID must be 10 alphanumeric characters.';
        }
        break;
      case 'annualIncome':
        if (parseInt(value) < 0) {
          errorMessage = 'Annual income must be greater than or equals 0.';
        }
        break;
      case 'phone':
        if (!/^[1-9]\d{9}$/.test(value)) {
          errorMessage = 'Phone number must be 10 digits and not start with 0.';
        }
        break;
      case 'confirmPassword':
        if (formData.password !== value) {
          setErrorMessage = 'Passwords do not match.';
        }
        break;
      default:
        break;
    }
  
    setFormData({ ...formData, [name]: value });

    setErrorMessage({ ...errorMessage, [name]: errorMessage });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    registerUser();
  };

  const handleStateSelection = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, state: value, district: '' });
  };

  const registerUser = async () => {
    try {
      const requestBody = {
        state: formData.state,
        district: formData.district,
        localAuthority: formData.localAuthority,
        ward: formData.ward,
        name: formData.name,
        age: formData.age,
        voterId: formData.voterId,
        phone: formData.phone,
        job: formData.job,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        annualIncome: formData.annualIncome,
        address: formData.address,
        confirmPassword: formData.confirmPassword
      };

      // Send form data to the backend
      const response = await fetch('http://localhost:4000/user/request-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
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
        password: '',
        confirmPassword: '',
        address: '',
        annualIncome: ''
      });
      setErrorMessage('Registration successful!');
      navigate("/ResidentSignupSuccess");
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

          <select name="state" value={formData.state} onChange={handleStateSelection} required>
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
            <div>
              <input type="text" name="district" placeholder="District*" value={formData.district} onChange={handleChange} required />
              {errorMessage.district && <p className="error-message">{errorMessage.district}</p>}
            </div>
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
            <div>
              <input type="text" name="localAuthority" placeholder="Local-Authority*" value={formData.localAuthority} onChange={handleChange} required />
              {errorMessage.localAuthority && <p className="error-message">{errorMessage.localAuthority}</p>}
            </div>
          )}
          <br /><br />

          {formData.localAuthority === 'SREEKRISHNAPURAM' ? (
            <select name="ward" value={formData.ward} onChange={handleChange} required>
              <option value="">Select Ward</option>
              {wardNo['SREEKRISHNAPURAM'].map(ward => (
                <option key={ward} value={ward}>{ward}</option>
              ))}
            </select>
          ) : (
            <div>
              <input type="number" name="ward" placeholder="Ward No.*" value={formData.ward} onChange={handleChange} required />
              {errorMessage.ward && <p className="error-message">{errorMessage.ward}</p>}
            </div>
          )}
          <br /><br />

        </div>
        <div className="form-section">
          <h2>Personal Details</h2>
          <div>
            <input type="text" name="name" placeholder="Name*" value={formData.name} onChange={handleChange} required />
             {errorMessage.name && <p className="error-message">{errorMessage.name}</p>}
          </div>
          <br /><br />

          <div>
            <input type="number" name="age" placeholder="Age*" value={formData.age} onChange={handleChange} required />
           {errorMessage.age && <p className="error-message">{errorMessage.age}</p>}
          </div>
          <br /><br />

          <div>
            <input type="text" name="voterId" placeholder="Voter ID*" value={formData.voterId} onChange={handleChange} required />
           {errorMessage.voterId && <p className="error-message">{errorMessage.voterId}</p>}
          </div>
          <br /><br />

          <div>
            <input type="number" name="phone" placeholder="Mobile No.*" value={formData.phone} onChange={handleChange} required />
           {errorMessage.phone && <p className="error-message">{errorMessage.phone}</p>}
          <br /><br />
          </div>
          
          <select name="job" value={formData.job} onChange={handleChange} required>
            <option value="">Job*</option>
            {jobs.map(job => (
              <option key={job} value={job}>{job}</option>
            ))}
          </select>
          <br /><br />
          
          <div>
           <input type="number" name="annualIncome" placeholder="Annual Income" value={formData.annualIncome} onChange={handleChange} />
            {errorMessage.annualIncome && <p className="error-message">{errorMessage.annualIncome}</p>}
          </div>
          <br /><br />
          <div>
            <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          </div>
        </div>

        <div className="form-section">
          <h2>Account Details</h2>
          <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required />
          <br /><br />
          <input type="text" name="username" placeholder="Username*" value={formData.username} onChange={handleChange} required />
          <br /><br />
          <input type="password" name="password" placeholder="Password*" value={formData.password} onChange={handleChange} required />
          <br /><br />
          <div>
            <input type="password" name="confirmPassword" placeholder="Re-enter Password*" value={formData.confirmPassword} onChange={handleChange} required />
            {errorMessage.confirmPassword && <p className="error-message">{errorMessage.confirmPassword}</p>}
          </div>
          <br /><br />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default ResidentSignup;
