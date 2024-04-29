import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-primary text-white py-4">
      <div className="container">
        <div className="text-center">
          <p className="footer-text mb-0">&copy; 2024 Janagrah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

