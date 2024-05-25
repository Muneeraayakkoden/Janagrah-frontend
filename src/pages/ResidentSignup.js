import React, { useState } from 'react';
import './ResidentSignup.css';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {FaUser, FaEnvelope, FaLock, FaAddressCard, FaPhone, FaBriefcase, FaMoneyBillWave, FaHome, FaImage, FaMapMarkerAlt, FaUserShield} from 'react-icons/fa';

const ResidentSignup = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/LoginPage');
  };

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
    address: '',
    image: '' 
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const [errorMessage, setErrorMessage] = useState({
    district: '',
    localAuthority: '',
    ward: '',
    name: '',
    age: '',
    voterId: '',
    phone: '',
    password:'',
    confirmPassword: '',
    annualIncome: '',
    image: '' 
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    let error = '';
  
    // Validation rules for each field
    switch (name) {
      case 'district':
      case 'localAuthority':
      case 'name':
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Field must contain only alphabets.';
        }
        break;
      case 'ward':
        if (!/^[1-9]\d*$/.test(value)) {
          error = 'Ward must be a number greater than 0.';
        }
        break;
      case  'age':
        if (parseInt(value) < 18) {
          error = 'Age must be 18 or older.';
        }
        break;
      case 'voterId':
        if (!/^[a-zA-Z0-9]{10}$/.test(value)) {
          error = 'Voter ID must be 10 alphanumeric characters.';
        }
        break;
      case 'annualIncome':
        if (parseInt(value) < 0) {
          error = 'Annual income must be greater than or equals 0.';
        }
        break;
      case 'phone':
        if (!/^[1-9]\d{9}$/.test(value)) {
          error = 'Phone number must be 10 digits and not start with 0.';
        }
        break;
      case 'password':
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        if (!passwordRegex.test(value)) {
          error = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        }
        break;
      case 'confirmPassword':
        if (formData.password !== value) {
          error = 'Passwords do not match.';
        }
        break;
      default:
        break;
    }
  
    setFormData({ ...formData, [name]: value });

    setErrorMessage({ ...errorMessage, [name]: error });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      // No file selected
      return;
    }
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes
    if (file.size > maxSize) {
      setErrorMessage({ ...errorMessage, image: 'File size exceeds 1MB limit.' });
      return;
    }
  
    // Clear image error message when a new image is selected
    setErrorMessage({ ...errorMessage, image: '' });
  
    const reader = new FileReader();
  
    // Event listener for when the FileReader has finished reading the file
    reader.onloadend = () => {
      // Log the result to see if the image data is being read correctly
      console.log("Image data URL:", reader.result);
      // Once the file has been read, set the image data URL to the formData
      setFormData({ ...formData, image: reader.result });
    };
  
    // Read the selected file as a data URL
    reader.readAsDataURL(file);
  };
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.image) {
      setErrorMessage({ ...errorMessage, image: 'Please upload an image.' });
      return;
    }
    if (Object.values(errorMessage).some(error => error)) {
      return;
    }
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
        image: formData.image.split(',')[1] 
      };
      console.log("requestBody :", requestBody); 

     
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

   
      const responseData = await response.json();
      console.log("Response Data:", responseData); 

     
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
        annualIncome: '',
        image: ''
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
      <div className="signup-container">
        <h1>RESIDENT REGISTRATION</h1>
        <form onSubmit={handleSubmit}>
        
          {currentPage === 1 && (
            <div className={`form-section ${currentPage === 1 ? 'visible' : ''}`}>
             
              <FaMapMarkerAlt />
             
              <select name="state" value={formData.state} onChange={handleStateSelection} required>
                <option value="">Select State*</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            
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
              {/* Ward Dropdown or Input */}
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
            </div>
          )}

         
          {currentPage === 2 && (
            <div className={`form-section ${currentPage === 2 ? 'visible' : ''}`}>
              <FaUser />
              
              <div>
                <input type="text" name="name" placeholder="Name*" value={formData.name} onChange={handleChange} required />
                {errorMessage.name && <p className="error-message">{errorMessage.name}</p>}
              </div>
             
              <div>
                <input type="number" name="age" placeholder="Age*" value={formData.age} onChange={handleChange} required />
                {errorMessage.age && <p className="error-message">{errorMessage.age}</p>}
              </div>
            
              <div>
                <input type="text" name="voterId" placeholder="Voter ID*" value={formData.voterId} onChange={handleChange} required />
                {errorMessage.voterId && <p className="error-message">{errorMessage.voterId}</p>}
              </div>
             
              <div>
                <input type="number" name="phone" placeholder="Mobile No.*" value={formData.phone} onChange={handleChange} required />
                {errorMessage.phone && <p className="error-message">{errorMessage.phone}</p>}
              </div>
           
              <select name="job" value={formData.job} onChange={handleChange} required>
                <option value="">Job*</option>
                {jobs.map(job => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>
             
              <div>
                <input type="number" name="annualIncome" placeholder="Annual Income" value={formData.annualIncome} onChange={handleChange} />
                {errorMessage.annualIncome && <p className="error-message">{errorMessage.annualIncome}</p>}
              </div>
            
              <div>
                <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
              </div>
            </div>
          )}

         
          {currentPage === 3 && (
            <div className={`form-section ${currentPage === 3 ? 'visible' : ''}`}>
             <FaUserShield />
            
              <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required />
           
              <input type="text" name="username" placeholder="Username*" value={formData.username} onChange={handleChange} required />
           
              <div>
                <input type="password" name="password" placeholder="Password*" value={formData.password} onChange={handleChange} required />
                {errorMessage.password && <p className="error-message">{errorMessage.password}</p>}
              </div>
              <div>
                <input type="password" name="confirmPassword" placeholder="Re-enter Password*" value={formData.confirmPassword} onChange={handleChange} required />
                {errorMessage.confirmPassword && <p className="error-message">{errorMessage.confirmPassword}</p>}
              </div>
           
              <div>
               <FaImage />
                <input type="file" id="image" name="image" accept="image/jpeg, image/png,image/jpg" onChange={handleImageUpload} />
                {errorMessage.image && <p className="error-message">{errorMessage.image}</p>}
              </div>
            </div>
          )}

       
          <div>Already Registered? <a href="#" onClick={handleLoginClick}> Login here</a></div>

      
          <div className="pagination">
          {currentPage > 1 && (
          <button
              type="button"
              className="prev-btn"
              onClick={() => handlePageChange(currentPage - 1)}>
              <FaArrowLeft /> Prev
            </button>
            )}
            <span className="page-indicator">{currentPage}/{totalPages}</span>
            {currentPage < totalPages && (
            <button
              type="button"
              className="next-btn"
              onClick={() => handlePageChange(currentPage + 1)}>
              Next <FaArrowRight />
            </button>
            )}
             {currentPage === totalPages && (
              <button className="Regbutton">Register</button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}

export default ResidentSignup;
