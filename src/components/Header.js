import React from 'react';
import logo from '../assets/logo.png';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Janagrah Logo" />
      </div>
      <div className="header-content">
        <div className="container">
          <h1>Your Voice, Shaping Our Ward</h1>
          <p>Stay informed, participate in surveys, and connect with your local authorities.</p>
          <button className="learn-more-btn">Learn More</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
