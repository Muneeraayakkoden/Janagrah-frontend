import React, { useState, useEffect } from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    let timer;
    if (showDescription) {
      timer = setTimeout(() => {
        setShowDescription(false);
      }, 5000); // fade after 5 seconds
    }
    return () => clearTimeout(timer);
  }, [showDescription]);

  const toggleDescription = () => {
    setShowDescription(prevState => !prevState);
  };

  return (
    <header className="header rheader">
      <div className="row">
        <div className="col-md">
          <h1 className="title">JANAGRAH</h1>
          <h3 className="hero-title">Your Voice, Shaping Our Ward</h3>
        </div>
      </div>
      <button className="btn btn-outline-primary" onClick={toggleDescription}>
        {showDescription ? 'View Less' : 'Learn More'}
      </button>
      {showDescription && (
        <div className="learn-more-popup fade-in">
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
