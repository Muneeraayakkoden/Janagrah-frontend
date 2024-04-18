// Card.js
import React from 'react';
import './Card.css'; // Import the CSS file for styling

const Card = ({ icon, title, description }) => {
  return (
    <div className="card">
      <i className={`card-icon ${icon}`}></i>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;
