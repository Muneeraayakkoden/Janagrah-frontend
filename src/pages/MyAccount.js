
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyAccount.css';
import { FaUserEdit  } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const MyAccount = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [isEditedSuccessfully, setIsEditedSuccessfully] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

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
        console.log(response);
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
                return (
                  <p key={key}>
                    
                    <span style={{ fontWeight: 'bold' }}>
                      {key}: 
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
            {isEditing && <button className="b1 "onClick={handleSave}>Save</button>}
            {!isEditing && <button className='b2' onClick={handleEdit}><FaUserEdit /></button>}
          </div>

        </div>
      )}
      {isEditedSuccessfully && <p className="success-message">Profile edited successfully!</p>}
      <button onClick={handleLogout}><IoLogOutOutline /> Logout</button>
    </div>
  );
};

export default MyAccount;

