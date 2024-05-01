import React, { useState } from 'react';
import logo from '../assets/logo.png';
//import { useNavigate } from 'react-router-dom';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  {/*const navigate = useNavigate();*/}
  const [showDescription, setShowDescription] = useState(false);

  {/*const handleProfileClick = () => {
    navigate('/MyAccount');
  };*/}

  const toggleDescription = () => {
    setShowDescription(prevState => !prevState);
  };

  return (
    <header className="header text-white py-3">
      <div className="row align-items-center">
        <div className="col">
          <div className="logo">
            <img src={logo} alt="Janagrah Logo" />
          </div>
        </div>
      </div>
      <div className="col-md">
        <h1 className="hero-title">Your Voice, Shaping Our Ward</h1>
      </div>
      <div className="col-auto">
        <button className="btn btn-outline-light" onClick={toggleDescription}> {showDescription ? 'View Less' : 'Learn More'} </button>
      </div>
      {showDescription && (
      <div className="learn-more-description text-primary py-3">
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
