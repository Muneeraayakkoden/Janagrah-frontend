

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';
import './Officialside.css';

function OfficialSide() {
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarExpanded(false); // Collapse sidebar after navigation
  };
  const handleLogout = () => {
    // Clear local storage or any other logout logic
    localStorage.clear();
    navigate('/LoginPage'); // Redirect to the login page or any other appropriate page
  };
  return (
    <div className={`sidebar ${sidebarExpanded ? 'expanded' : ''}`}>
      <div className="officiallogo">
        <img src={logo} alt="Janagrah Logo" />
      </div>
      
      <div className="nav-icons">
      <div className="nav-icon" onClick={() => handleNavigation('/OfficialHome')}>
          <i className="fas fa-home"></i>
          {sidebarExpanded && <span>Home</span>}
        </div>
        <div className="nav-icon" onClick={() => handleNavigation('/MemberAccount')}>
          <i className="fa-solid fa-user"></i>
          {sidebarExpanded && <span>Profile</span>}
        </div>
        <div className="nav-icon" onClick={() => handleNavigation('/officialNotification')}>
          <i className="fas fa-bell"></i>
          {sidebarExpanded && <span>Notifications</span>}
        </div>
        <div className="nav-icon" onClick={() => handleNavigation('/Surveyboth')}>
          <i className="fas fa-list"></i>
          {sidebarExpanded && <span>Surveys</span>}
        </div>
        <div className="nav-icon" onClick={() => handleNavigation('/AnnouncementHistory')}>
          <i className="fas fa-bullhorn"></i>
          {sidebarExpanded && <span>Announcements</span>}
        </div>
        <div className="nav-icon" onClick={() => handleNavigation('/AllResidents')}>
          <i className="fas fa-users"></i>
          {sidebarExpanded && <span>View All Residents</span>}
        </div>
      </div>
      <div className="nav-icon logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          {sidebarExpanded && <span>Logout</span>}
        </div>
      <div className="toggle-btn" onClick={handleSidebarToggle}>
        {sidebarExpanded ? '<' : '>'}
      </div>
    </div>
  );
}

export default OfficialSide;
