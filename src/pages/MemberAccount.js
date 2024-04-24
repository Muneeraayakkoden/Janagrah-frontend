import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyAccount.css';

const MemberAccount = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Retrieve the user ID from local storage
      const username = JSON.parse(localStorage.getItem('username'));
      const password = JSON.parse(localStorage.getItem('password'));
      console.log(username);
      console.log(password);
      const data ={username,password}
      setUserData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('token');
    // Navigate to the login page
    navigate('/LoginPage');
  };
  

  return (
    <div className="profile-page">
      <h1>Member Profile</h1>
      {userData && (
        <div className="user-info">
          <h2>Personal Information</h2>
          <p>Username: {userData.username}</p>
          <p>Password: {userData.password}</p>
          {/* Display other user details here */}
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MemberAccount;
