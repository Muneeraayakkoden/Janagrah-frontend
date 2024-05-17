import React from 'react';
import Header from '../components/Header';
import Services from './Services';
import './ResidentHome.css';
import { useNavigate } from 'react-router-dom';
import Announcement from './Announcement';
import Footer from '../components/Footer';
import logo from '../assets/logo.png'; // Import the logo image

const ResidentHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('token');
    // Navigate to the login page
    navigate('/LoginPage');
  };

  return (
    <div className="resident-home">
      <Header>
        <img src={logo} alt="Janagrah Logo" className="logo" /> {/* Add the logo */}
        <h1>JANAGRAH</h1>
        <p>Your Voice, Shaping our Ward</p>
      </Header>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={() => navigate('/ContactPage')}>
              <i className="fas fa-envelope"></i> <span className="nav-text">CONTACT</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={() => navigate('/dosurvey')}>
              <i className="fas fa-poll"></i> <span className="nav-text">SURVEYS</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={() => navigate('/MyAccount')}>
              <i className="fas fa-user"></i> <span className="nav-text">PROFILE</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> <span className="nav-text">LOGOUT</span>
            </a>
          </li>
        </ul>
      </nav>
      <main className="main-content">
        <section id="news" className="news-section">
          <Announcement />
        </section>
        <section id="services" className="services-section">
          <Services />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResidentHome;

