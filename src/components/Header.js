import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);

  const handleProfileClick = () => {
    navigate('/MyAccount');
  };

  const toggleDescription = () => {
    setShowDescription(prevState => !prevState);
  };

  return (
    <header className="header bg-primary text-white py-1">

      <div className="logo">
        <img src={logo} alt="Janagrah Logo" />
      </div>
      <div className="profile">
        <i className="fa-solid fa-user" onClick={handleProfileClick}></i>
      </div>

      <div className="hero text-center py-3">
        <h1 className="hero-title">Your Voice, Shaping Our Ward</h1>
          <button className="btn" onClick={toggleDescription}>
            {showDescription ? 'View Less' : 'Learn More'}
          </button>
      </div>

      {showDescription && (
        <div className="learn-more-description  text-primary py-1">
          <div className="paragraphs">
            <p>Janagrah is a resident engagement platform designed to empower residents and strengthen the foundations of our community. We facilitate open communication and informed decision-making by providing a direct line between residents and local authorities.</p>
            <p>Together, we can build a more engaged and informed community.</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
