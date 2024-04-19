import React from 'react';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Janagrah Logo" />
        </div>
        <div className="profile">
          <i className="far fa-bell"></i>
          <button className="profile-btn">My Account</button>
        </div>
      </div>
      <div className="hero">
        <div className="container">
          <h1 className="hero-title">Your Voice, Shaping Our Ward</h1>
          <p className="hero-text">Stay informed, participate in surveys, and connect with your local authorities.</p>
          <button className="hero-button">Learn More</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
