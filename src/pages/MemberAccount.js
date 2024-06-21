import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MemberAccount.css';
import Officialside from '../components/Officialside.js';
import { IoLogOutOutline } from "react-icons/io5";

const MemberAccount = () => {
  const [userData, setUserData] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data and image when the component mounts
    fetchUserData();
    fetchUserImage();
  }, []);

  const fetchUserData = async () => {
    try {
      // Retrieve the user data from local storage
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      const age = JSON.parse(localStorage.getItem('age'));
      const district = JSON.parse(localStorage.getItem('district'));
      const phone_no = JSON.parse(localStorage.getItem('phone_no'));
      const name = JSON.parse(localStorage.getItem('name'));
      const email = JSON.parse(localStorage.getItem('email'));
      const wardNo = JSON.parse(localStorage.getItem('wardNo'));
      const state = JSON.parse(localStorage.getItem('state'));
      const localgovernment = JSON.parse(localStorage.getItem('localgovernment'));

      const data = {
        username,
        password,
        age,
        district,
        phone_no,
        name,
        email,
        wardNo,
        state,
        localgovernment,
      };
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const fetchUserImage = async () => {
    try {
      const username = localStorage.getItem('username');

      const response = await fetch('http://localhost:4000/login/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setUserImage(responseData.data);
      } else {
        console.error('Failed to fetch image');
      }
    } catch (error) {
      console.error('Error fetching image:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="profile-page1">
      <Officialside />
      <h1>Member Profile</h1>
      {userData && (
        <div className="user-info1">
          <div className="member-image-container">
            {userImage && <img className="member-image" src={`data:image/jpeg;base64,${userImage}`} alt="Resident" />}
          </div>
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
      <button className='ward-logout' onClick={handleLogout}>
        <IoLogOutOutline /> Logout</button>
    </div>
  );
};

export default MemberAccount;
