import React, { useState } from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const [showDescription, setShowDescription] = useState(false);
  const toggleDescription = () => {
    setShowDescription(prevState => !prevState);
  };

  return (
    <header className="header bg-white text-primary">
      <div className="row">
        <div className="col-md">
          <h1>JANAGRAH</h1>
          <h3 className="hero-title text-primary">Your Voice, Shaping Our Ward</h3>
        </div>
      </div>
      <div>
        <button className="btn btn-outline-primary" onClick={toggleDescription}> {showDescription ? 'View Less' : 'Learn More'} </button>
      </div>
      {showDescription && (
      <div className="learn-more-description text-primary">
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
