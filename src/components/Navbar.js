import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from '../assets/logo2.png';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/LoginPage');
  };

    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={logo2} alt="Janagrah Logo" className="logo img-fluid" />
                <h5 className="htitle">JANAGRAH</h5>
            </div>
            <ul className="navbar-nav">

                <li class="nav-item">
                    <a href="#aboutUs-section" class="nav-link">
                        <i class="fas fa-info-circle"></i>
                        <span class="nav-text">ABOUT US</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => navigate('/dosurvey')}>
                        <i className="fas fa-poll"></i> <span className="nav-text">SURVEYS</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => navigate('/ContactPage')}>
                        <i className="fas fa-envelope"></i> <span className="nav-text">CONTACT</span>
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
    );
};

export default Navbar;

