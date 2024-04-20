import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="profile">
          <i class="fa-solid fa-bell"></i>
          <button className="profile-btn" onClick={() => {
            navigate('/Notification');}}>Notification</button>
        </div>
        <div className="logo">
          <img src={logo} alt="Janagrah Logo" />
        </div>
        <div className="profile">
          <i class="fa-solid fa-user"></i>
          <button className="profile-btn" onClick={toggleProfileDropdown}>Profile</button>
          {isProfileDropdownOpen && (
            <ul className="profile-dropdown-menu">
              <li><a href="#">My Account</a></li>
              <li><a href="#">Logout</a></li>
              <li><a href="#">Surveys Done</a></li>
            </ul>
          )}
        </div>
      </div>
      <div className="hero">
        <div className="container">
          <h1 className="hero-title">Your Voice, Shaping Our Ward</h1>
          <div className='hero-content'>
            <p className="hero-text">Stay informed, participate in surveys, and connect with your local authorities.</p>
            <button className="hero-button">Learn More</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;