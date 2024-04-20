import React from 'react';
import './Card.css'; 

const Card = ({ icon, title, description }) => {
  return (
    <div className="card">
      <i className={`card-icon ${icon}`}></i>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};
export default  Card;