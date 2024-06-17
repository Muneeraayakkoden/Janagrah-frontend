import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/LoginPage');
  };

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
    const handleNavigation = (path) => {
        navigate(path);
        setSidebarExpanded(false); // Collapse sidebar after navigation
  };

    return (
        <nav className={`navbar ${sidebarExpanded ? 'expanded' : ''}`}>
            <div className="navlogo-container">
                <img src={logo} alt="Janagrah Logo" className="logo img-fluid" />
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() =>  handleNavigation('/residentHome')}>
                        <i className="fas fa-home"></i> 
                        {sidebarExpanded && <span className="nav-text">HOME</span>}
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() =>  handleNavigation('/dosurvey')}>
                        <i className="fas fa-poll"></i> 
                        {sidebarExpanded && <span className="nav-text">SURVEYS</span>}
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() =>  handleNavigation('/ContactPage')}>
                        <i className="fas fa-envelope"></i> 
                        {sidebarExpanded && <span className="nav-text">CONTACT</span>}
                    </a>
                </li>
                
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() =>  handleNavigation('/MyAccount')}>
                        <i className="fas fa-user"></i> 
                        {sidebarExpanded && <span className="nav-text">PROFILE</span>}
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i> 
                        {sidebarExpanded && <span className="nav-text">LOGOUT</span>}
                    </a>
                </li>
                <div className="togglebtn" onClick={handleSidebarToggle}>
                    {sidebarExpanded ? '<' : '>'}
                </div>
            </ul>
            
        </nav>
    );
};

export default Navbar;

