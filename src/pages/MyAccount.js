import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyAccount.css';

const ResidentProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [surveysCompleted, setSurveysCompleted] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data and surveys completed when the component mounts
    fetchUserData();
    fetchSurveysCompleted();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user data from the backend
      const response = await fetch('http://localhost:4000/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you're using JWT for authentication
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const fetchSurveysCompleted = async () => {
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
  };

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
          <p>Name: {userData.name}</p>
          <p>Age: {userData.age}</p>
          {/* Display other user details here */}
          <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
      )}
      <div className="surveys-completed">
        <h2>Surveys Completed</h2>
        <ul>
          {surveysCompleted.map((survey, index) => (
            <li key={index}>{survey.title} - Completed on: {survey.completionDate}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ResidentProfilePage;
