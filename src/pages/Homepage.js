import React from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../assets/logo2.png'; // Adjust the import path for the logo image
import './Homepage.css';

function Homepage() {
  return (
    <div className="Homepage">
      <div className="top-bar">
        <Link to="/LoginPage" className="login-btn">Login</Link>
        <Link to="/ResidentSignup" className="get-started-btn">Get Started</Link>
      </div>
      <div className="header">
        <img src={logo2} alt="Janagrah Logo" className="logo" /> {/* Use the logo image */}
        <h1>JANAGRAH</h1>
        <p>Connecting Communities Digitally</p>
      </div>
      <div className="services">
        <div className="service">
          <h2><b>Surveys</b></h2>
          <h5>Participate in Surveys: Voice your opinions</h5>
          <p>Participate in surveys to voice your opinions and contribute to community decision-making.<br />Your engagement is key to our collective success.</p>
        </div>
        <div className="service">
          <h2><b>Direct Communication</b></h2>
          <h5>Message your ward leader anonymously or non-anonymously.</h5>
          <p>Residents can easily reach out to convey their suggestions, complaints, or feedback.</p>
        </div>
        <div className="service">
          <h2><b>Announcements</b></h2>
          <h5>Stay informed about important announcements.</h5>
          <p>Stay updated on community events, meetings, and important notices from your ward leader.</p>
        </div>
      </div>

      <div className="cta">
        <p>Join us in building a vibrant and harmonious community on Janagrah. Together, we can create a platform where every voice matters, and positive change is a collective effort.</p>
        <Link to="/LoginPage" className="login-btn">Login</Link>
        <Link to="/ResidentSignup" className="signup-btn">Sign Up</Link>
      </div>
    </div>
  );
}

export default Homepage;


