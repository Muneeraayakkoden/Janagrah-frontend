import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MemberAccount.css';
import Officialside from '../components/Officialside.js';
import { IoLogOutOutline } from "react-icons/io5";

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
      const age = JSON.parse(localStorage.getItem('age'));
      const district = JSON.parse(localStorage.getItem('district'));
      const phone_no = JSON.parse(localStorage.getItem('phone_no'));
      const name = JSON.parse(localStorage.getItem('name'));
      const email = JSON.parse(localStorage.getItem('email'));
      const wardNo = JSON.parse(localStorage.getItem('wardNo'));
      const state = JSON.parse(localStorage.getItem('state'));
      const localgovernment = JSON.parse(localStorage.getItem('localgovernment'));
      console.log(username);
      console.log(password);

      const data ={username,password,age,district,phone_no,name,email,wardNo,state,localgovernment}
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
    <div className="profile-page1">
       <Officialside />
      <h1>Member Profile</h1>
      {userData && (
        <div className="user-info1">
          <div className="resident-image-container">
                <img className="resident-image" src={`data:image/jpeg;base64,${userData.image}`} alt="Resident" />
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
      <button onClick={handleLogout}><IoLogOutOutline />Logout</button>
    </div>
  );
};

export default MemberAccount;
