import React, {useState} from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);
  const [buttonText, setButtonText] = useState('Learn More');

  const handleProfileClick = () => {
    navigate('/MyAccount');
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
    setButtonText(showDescription ? 'Learn More' : 'View Less');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Janagrah Logo" />
        </div>
        <div className="profile">
          <i class="fa-solid fa-user" onClick={handleProfileClick}></i>
        </div>
      </div>
      <div className="hero">
        <div className="container">
          <h1 className="hero-title">Your Voice, Shaping Our Ward</h1>
          <div className='hero-content'>
            <button className="hero-button" onClick={toggleDescription}>{buttonText}</button>
          </div>
        </div>
      </div>
      {showDescription && (
        <div className="learn-more-description">
          <p>Janagrah is a resident engagement platform designed to empower residents and strengthen the foundations of our community. We facilitate open communication and informed decision-making by providing a direct line between residents and local authorities.</p>
          <p>Together, we can build a more engaged and informed community.</p>
        </div>
      )}

    </header>
  );
};

export default Header;