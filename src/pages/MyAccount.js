import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyAccount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'; // Import necessary FontAwesome icons
import Navbar from '../components/Navbar';

const MyAccount = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [isEditedSuccessfully, setIsEditedSuccessfully] = useState(false);
  const [userrData, setUserrData] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const username = JSON.parse(localStorage.getItem('username'));

      const response = await fetch('http://localhost:4000/user/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setUserrData(responseData.data);
        setResponseMessage('');
      } else {
        console.error('Failed to fetch image');
      }
    } catch (error) {
      console.error('Error fetching image:', error.message);
    }
  };

  const fetchUserData = () => {
    try {
      const username = JSON.parse(localStorage.getItem('username'));
      const job = JSON.parse(localStorage.getItem('job'));
      const age = JSON.parse(localStorage.getItem('age'));
      const phn = JSON.parse(localStorage.getItem('phone'));
      const email = JSON.parse(localStorage.getItem('email'));
      const annualIncome = JSON.parse(localStorage.getItem('annualIncome'));
      const address = JSON.parse(localStorage.getItem('address'));
      const name = JSON.parse(localStorage.getItem('name'));
      const ward = JSON.parse(localStorage.getItem('ward'));
      const localAuthority = JSON.parse(localStorage.getItem('localAuthority'));
      
      const data = {
        username,
        name,
        job,
        age,
        phn,
        email,
        annualIncome,
        address,
        ward,
        localAuthority,
        
      };

      setUserData(data);
      setEditedUserData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:4000/user/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUserData),
      });
      
      if (response.ok) {
        const updatedUserData = await response.json();
        Object.entries(updatedUserData.user).forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value));
        });
        setUserData(updatedUserData.user);
        setIsEditing(false);
        setIsEditedSuccessfully(true); 
      } else {
        console.error('Failed to save profile changes');
      }
    } catch (error) {
      console.error('Error saving profile changes:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  return (
    <div className="profile-page">
      <Navbar />
   
        {userData && (
          <div className="account">
            <h1>PROFILE</h1>
            <div className="ward-info">
              <p>
                Ward ID: {userData.ward}<br />
                Ward Name: {userData.localAuthority}<br />
              </p>
            </div>
            <h3>Personal Details</h3>
            <div className="user-info-container"> 
              <div className="user-info">
                {Object.entries(userData).map(([key, value]) => {
                  if (['username', 'name', 'job', 'age', 'phn', 'email', 'annualIncome', 'address','password'].includes(key)) {
                    let label = '';
                    switch (key) {
                      case 'username':
                        label = 'Username';
                        break;
                      case 'name':
                        label = 'Name';
                        break;
                      case 'job':
                        label = 'Job Title';
                        break;
                      case 'age':
                        label = 'Age';
                        break;
                      case 'phn':
                        label = 'Phone';
                        break;
                      case 'email':
                        label = 'Email';
                        break;
                      case 'annualIncome':
                        label = 'Annual Income';
                        break;
                      case 'address':
                        label = 'Address';
                        break;
                      case 'password':
                        label="Password";
                        break;
                      default:
                        break;
                    }
                    return (
                      <p key={label}>
                        <span style={{ fontWeight: 'bold' }}>{label}: </span> 
                        {isEditing ? (
                          <input type="text" name={key} value={editedUserData[key] || ''} onChange={handleChange} />
                        ) : (
                          value
                        )}
                      </p>
                    );
                  }
                  return null;
                })}
                {isEditing && <button className="b1" onClick={handleSave}>Save</button>}
                {!isEditing && <button className='b2' onClick={handleEdit}><FontAwesomeIcon icon={faUserEdit} /></button>}
              </div>
              <div className="resident-image-container">
                <img className="resident-image" src={`data:image/jpeg;base64,${userrData.image}`} alt="Resident" />
              </div>
            </div>
            {isEditedSuccessfully && <p className="success-message">Profile updated successfully!</p>}
          </div>
        )} 
    </div>
  );
  
};

export default MyAccount;
