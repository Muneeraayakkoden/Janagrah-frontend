import React, { useState, useEffect } from 'react';

const UserRequests = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    sendUserDataToBackend();
  }, []);

  const sendUserDataToBackend = async () => {
    try {
      // Retrieve data from local storage
      const state = JSON.parse(localStorage.getItem('state'));
      const district = JSON.parse(localStorage.getItem('district'));
      const localgovernment = JSON.parse(localStorage.getItem('localgovernment'));
      const wardNo = JSON.parse(localStorage.getItem('wardNo'));

      const requestData = { state, district, localgovernment, wardNo };

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
        setUserData(responseData.data); // Update state with fetched data
      } else {
        console.error('Failed to send user data');
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  const handleApprove = async (userId) => {
    try {
      // Implement approve logic here
      console.log('Approve user with ID:', userId);
      const username = JSON.parse(localStorage.getItem('username'));

      // Send user ID to the backend for approval
      const response = await fetch('http://localhost:4000/login/userapprove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId,username }),
      });

      if (response.ok) {
        console.log('User approved successfully');
        // Perform any additional actions after approval
      } else {
        console.error('Failed to approve user');
      }
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleReject = async (userId) => {
    try {
      // Implement reject logic here
      console.log('Reject user with ID:', userId);

      // Send user ID to the backend for rejection
      const response = await fetch('http://localhost:4000/login/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        console.log('User rejected successfully');
        // Perform any additional actions after rejection
      } else {
        console.error('Failed to reject user');
      }
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  return (
    <div>
      <h1>User Requests Page</h1>
      <ul>
        {userData && userData.length > 0 ? (
          userData.map((user) => (
            <li key={user._id}>
              <p>Name: {user.name}</p>
              <p>Age: {user.age}</p>
              <p>Phone: {user.phone}</p>
              <p>Email: {user.email}</p>
              <p>State: {user.state}</p>
              <p>District: {user.district}</p>
              <p>Local Government: {user.localgovernment}</p>
              <p>Ward No: {user.wardNo}</p>
              <p>Job: {user.job}</p>
              <p>Address: {user.address}</p>
              <p>Username: {user.username}</p>
              {/* Add more fields if needed */}
              <button onClick={() => handleApprove(user._id)}>Approve</button>
              <button onClick={() => handleReject(user._id)}>Reject</button>
            </li>
          ))
        ) : (
          <p>No user data available</p>
        )}
      </ul>
    </div>
  );

};

export default UserRequests;
