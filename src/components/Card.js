import React from 'react';
import './Card.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ icon, title, description }) => {
  return (
    <div className="card shadow rounded bg-light text-dark">
      <div className="card-body">
        <i className={`card-icon ${icon} `}></i>
          <h3 className="card-title" mt-3 mb-2>{title}</h3>
          <p className="card-description">{description}</p>
      </div>
    </div> 
  );
};
export default  Card;