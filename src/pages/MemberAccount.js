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
    localStorage.clear();
    navigate('/LoginPage');
  };
  

  return (
    <div className="profile-page">
      <h1>Member Profile</h1>
      {userData && (
        <div className="user-info">
          <div className="resident-image-container">
                <img className="resident-image" src={`data:image/jpeg;base64,${userData.image}`} alt="Resident" />
              </div>
          <h2>Personal Information</h2>
          <p>Name: {userData.name}</p>
          <p>Username: {userData.username}</p>
          <p>Password: {userData.password}</p>
          <p>Age: {userData.age}</p>
          <p>Phone Number: {userData.phone_no}</p>
          <p>Email: {userData.email}</p>
          <p>State: {userData.state}</p>
          <p>District: {userData.district}</p>
          <p>Ward No: {userData.wardNo}</p>
          <p>Local Government: {userData.localgovernment}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MemberAccount;
