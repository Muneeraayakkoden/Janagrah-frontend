import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyAccount.css';

const ResidentProfilePage = () => {
  const [userData, setUserData] = useState(null);
  //const [surveysCompleted, setSurveysCompleted] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data and surveys completed when the component mounts
    fetchUserData();
    //fetchSurveysCompleted();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user data from the backend
      const response = await fetch('http://localhost:4000/login/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username,password}),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      if (data && data.success && data.user) {
        // Set the user data to state
        setUserData(data.user);
       
      } else {
        throw new Error('No user data found in response');
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  /*const fetchUserData = async () => {
    try {
      // Fetch user data from the backend
      const response = await fetch('http://localhost:4000/login/profile', {
        method: 'GET',
        credentials: 'include', // Include cookies
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };*/
  

  /*const fetchSurveysCompleted = async () => {
    try {
      // Fetch surveys completed by the user from the backend
      // Adjust the endpoint URL and headers as needed
      const response = await fetch('http://localhost:4000/user/surveys', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch surveys completed');
      }
      const data = await response.json();
      setSurveysCompleted(data);
    } catch (error) {
      console.error('Error fetching surveys completed:', error.message);
    }
  };*/

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('token');
    // Navigate to the login page
    navigate('/loginPage');
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
