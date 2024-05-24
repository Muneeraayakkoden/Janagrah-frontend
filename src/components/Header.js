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
    <header className="rheader">
      <div className="row">
        <div className="col-md">
          <h1 className="title">JANAGRAH</h1>
          <h3 className="hero-title">Your Voice, Shaping Our Ward</h3>
        </div>
      </div>
     
    </header>
  );
};

export default Header;
