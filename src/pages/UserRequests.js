import React, { useState, useEffect } from 'react';
import './UserRequests.css';

const UserRequests = () => {
  const [userData, setUserData] = useState([]);  // Initialize as an empty array
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    sendUserDataToBackend();
  }, []);

  const sendUserDataToBackend = async () => {
    try {
      // Retrieve data from local storage
      const state = JSON.parse(localStorage.getItem('state'));
      const district = JSON.parse(localStorage.getItem('district'));
      const localAuthority = JSON.parse(localStorage.getItem('localgovernment'));
      const ward = JSON.parse(localStorage.getItem('wardNo'));

      const requestData = { state, district, localAuthority, ward };

      const response = await fetch('http://localhost:4000/login/userRequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('User data:', responseData);
        setUserData(responseData.data || []);  // Ensure data is an array
        setResponseMessage('');
      } else {
        console.error('Failed to send user data');
        const errorData = await response.json();
        setResponseMessage(errorData.message);
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      setResponseMessage('Error: ' + error.message);
    }
  };

  const handleApprove = async (userId) => {
    try {
      console.log('Approve user with ID:', userId);
      const username = JSON.parse(localStorage.getItem('username'));

      const response = await fetch('http://localhost:4000/login/userapprove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, username }),
      });

      if (response.ok) {
        console.log('User approved successfully');
        setResponseMessage('User approved successfully');
      } else {
        console.error('Failed to approve user');
        const errorData = await response.json();
        setResponseMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error approving user:', error);
      setResponseMessage('Error: ' + error.message);
    }
  };

  const handleReject = async (userId) => {
    try {
      console.log('Reject user with ID:', userId);

      const response = await fetch('http://localhost:4000/login/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        console.log('User rejected successfully');
        setResponseMessage('User rejected successfully');
      } else {
        console.error('Failed to reject user');
        const errorData = await response.json();
        setResponseMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error rejecting user:', error);
      setResponseMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="user-container">
      {userData && userData.length > 0 ? (  // Add check for userData
        userData.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-image-container">
              <img className="user-image" src={`data:image/jpeg;base64,${user.image}`} alt="User" />
            </div>
            <div className="user-details">
              <p>Name: {user.name}</p>
              <p>Age: {user.age}</p>
              <p>Phone: {user.phone}</p>
              <p>Email: {user.email}</p>
              <p>State: {user.state}</p>
              <p>District: {user.district}</p>
              <p>Local Government: {user.localAuthority}</p>
              <p>Ward No: {user.ward}</p>
              <p>Job: {user.job}</p>
              <p>Address: {user.address}</p>
              <p>Username: {user.username}</p>
            </div>
            <div className="button-container">
              <button className="accept-button" onClick={() => handleApprove(user._id)}>Approve</button>
              <button className="reject-button" onClick={() => handleReject(user._id)}>Reject</button>
            </div>
          </div>
        ))
      ) : (
        <p>No user data available</p>
      )}
      {responseMessage && <p style={{ color: 'red' }}>{responseMessage}</p>}
    </div>
  );
};

export default UserRequests;
