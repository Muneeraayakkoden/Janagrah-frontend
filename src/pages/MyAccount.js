import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyAccount.css';
import { FaUserEdit } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const MyAccount = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [isEditedSuccessfully, setIsEditedSuccessfully] = useState(false);
  const [userrData, setUserrData] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when the component mounts
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
        setUserrData(responseData.data); // Update state with fetched data
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
      // Retrieve user data from local storage
      const username = JSON.parse(localStorage.getItem('username'));
      const password = JSON.parse(localStorage.getItem('password'));
      const job = JSON.parse(localStorage.getItem('job'));
      const age = JSON.parse(localStorage.getItem('age'));
      const phn = JSON.parse(localStorage.getItem('phone'));
      const email = JSON.parse(localStorage.getItem('email'));
      const annualIncome = JSON.parse(localStorage.getItem('annualIncome'));
      const address = JSON.parse(localStorage.getItem('address'));
      const name = JSON.parse(localStorage.getItem('name'));
      const ward = JSON.parse(localStorage.getItem('ward'));
      const localAuthority = JSON.parse(localStorage.getItem('localAuthority'))
      const data = {
        username,
        password,
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

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.clear();
    // Navigate to the login page
    navigate('/LoginPage');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Send updated data to the backend
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
        setIsEditedSuccessfully(true); // Set the state to indicate successful edit
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
      <h1>RESIDENT PROFILE</h1>
      <div className="resident-image-container">
        <img className="resident-image" src={`data:image/jpeg;base64,${userrData.image}`} alt="Resident" />
      </div>
      {userData && (
        <div>
          <div className="ward-info">
            <h2>Ward Details</h2>
            {userData && (
              <p>
                Ward ID: {userData.ward}<br />
                Ward Name: {userData.localAuthority}<br />
              </p>
            )}
          </div>
          <div className="user-info">
            <h2>Personal Details</h2>
            {Object.entries(userData).map(([key, value]) => {
              if (
                ['username', 'password', 'name', 'job', 'age', 'phn', 'email', 'annualIncome', 'address'].includes(
                  key
                )
              ) {
                let label = ''
                switch(key){
                  case 'username':
                    label = 'Username'
                    break;
                  case 'password':
                    label = 'Password';
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
                }
                return (
                  <p key={label}>
                    
                    <span style={{ fontWeight: 'bold' }}>
                      {label}: 
                    </span> 
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
            {!isEditing && <button className='b2' onClick={handleEdit}><FaUserEdit /></button>}
          </div>
        </div>
      )}
      {isEditedSuccessfully && <p className="success-message">Profile edited successfully!</p>}
      <button className="leave" onClick={handleLogout}><IoLogOutOutline /> Logout</button>
    </div>
  );
};

export default MyAccount;
