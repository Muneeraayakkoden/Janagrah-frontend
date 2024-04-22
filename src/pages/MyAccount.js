import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyAccount.css';

const ResidentProfilePage = () => {
  const [userData, setUserData] = useState(null);
<<<<<<< HEAD
  //const [surveysCompleted, setSurveysCompleted] = useState([]);
=======
>>>>>>> b2b7f1bd82a1e6779f7f4849116fb2b68f9f41de
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data and surveys completed when the component mounts
    fetchUserData();
<<<<<<< HEAD
    //fetchSurveysCompleted();
=======
>>>>>>> b2b7f1bd82a1e6779f7f4849116fb2b68f9f41de
  }, []);

  const fetchUserData = async () => {
    try {
      // Retrieve the user ID from local storage
      const userID = JSON.parse(localStorage.getItem('userId'));
      const username = JSON.parse(localStorage.getItem('username'));
      const password = JSON.parse(localStorage.getItem('password'));
      console.log(userID)
      console.log(username);
      console.log(password);
      const data ={username,password}
      setUserData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
<<<<<<< HEAD
=======


>>>>>>> b2b7f1bd82a1e6779f7f4849116fb2b68f9f41de
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('token');
    // Navigate to the login page
    navigate('/LoginPage');
  };
  
  const handleEditProfile = () => {
    // Navigate to the edit profile page
    navigate('/EditProfile');
  };

  return (
    <div className="profile-page">
      <h1>Resident Profile</h1>
      {userData && (
        <div className="user-info">
          <h2>Personal Information</h2>
          <p>Username: {userData.username}</p>
          <p>Password: {userData.password}</p>
          {/* Display other user details here */}
          <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ResidentProfilePage;
