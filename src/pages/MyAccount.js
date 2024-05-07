import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyAccount.css';

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
      <h1>Resident Profile</h1>
      
      {userData && (
        <div className="user-info">
          <h2>Personal Information</h2>
          {Object.entries(userData).map(([key, value]) => (
            <p key={key}>
              {key}: {isEditing ? <input type="text" name={key} value={editedUserData[key] || ''} onChange={handleChange} /> : value}
            </p>
          ))}
          {/* Display other user details here */}
          {isEditing ? <button onClick={handleSave}>Save</button> : <button onClick={handleEdit}>Edit Profile</button>}
        </div>
      )}
      {isEditedSuccessfully && <p className="success-message">Profile edited successfully!</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
       
      

  );
};

export default MyAccount;
