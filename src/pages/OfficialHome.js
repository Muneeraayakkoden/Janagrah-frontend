/*import React, { useEffect } from 'react';
import './OfficialHome.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

  // Replace with your actual API endpoint and data fetching logic
  const API_ENDPOINT = '/api/official/notifications';


function OfficialHome() {
  const navigate = useNavigate();
  
  const handleNotificationClick = () => {
    navigate('/officialNotification');
  };

  const handleProfileClick = () => {
    navigate('/MemberAccount');
  };
   

  const fetchNotifications = async () => {
    var bell = document.querySelector('.notification-bell');
    bell.classList.toggle('active');
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  

  
  return (
    <div className="official-homepage">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Janagrah Logo" />
        </div>
        <header className="header">
          <h1>JANAGRAH</h1>
          <p>Empowering Our Community</p>
        </header>
        <div className="profile">
          <i className="fa-solid fa-user" onClick={handleProfileClick}></i>
        </div>
        <div className="notification-bell" onClick={handleNotificationClick}>
        <i className="fas fa-bell"></i>
        </div>
      </div>
      <main className="main">

        <section className="survey-section">
          <h2>SURVEY SECTION</h2>
          <div className="survey-cards">
            <a href="#" className="survey-card" onClick={(e) => {e.preventDefault(); navigate('/CreateSurveys');}}>
              <h3>Create Survey</h3>
            </a>
            <a href="#" className="survey-card" onClick={(e) => navigate('/SurveyPage')}>
              <h3>Surveys Done</h3>
            </a>
          </div>
        </section>

        <section className="updates-section">
          <br></br><h2>ANNOUNCEMENT SECTION</h2>
          <div className="updates-cards">
            <a href="#" className="updates-card" onClick={(e) => navigate('/AnnouncementHistory')}>
              <h3>Announcements</h3>
            </a>
          </div>
        </section>
        <section className="residents-section">
         <br></br><h2><b>RESIDENTS SECTION</b></h2>
          <div href="#" className="residents-card" onClick={(e) => navigate('/AllResidents')}>
            <h3>View All Residents</h3>
          </div>
        </section>

      </main>
      <footer className="footer">
      <div className="footer-container">
        <p className="copyright" >&copy; Janagrah 2024</p>
      </div>
      </footer>
    </div>
  );
};

export default OfficialHome;*/
import React, { useState } from 'react';
import './OfficialHome.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';
import aboutImage from '../assets/church-of-the-king-j9jZSqfH5YI-unsplash.jpg';

function OfficialHome() {
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [selectedSection, setSelectedSection] = useState('about');

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="official-homepage">
      <div className={`sidebar ${sidebarExpanded ? 'expanded' : ''}`}>
        <div className="logo">
          <img src={logo} alt="Janagrah Logo" />
        </div>
        <div className="nav-icons">
          <div className="nav-icon" onClick={() => navigate('/MemberAccount')}>
            <i className="fa-solid fa-user"></i>
            {sidebarExpanded && <span>Profile</span>}
          </div>
          <div className="nav-icon" onClick={() => navigate('/officialNotification')}>
            <i className="fas fa-bell"></i>
            {sidebarExpanded && <span>Notifications</span>}
          </div>
          <div className="nav-icon" onClick={() => handleSectionChange('surveys')}>
            <i className="fas fa-list"></i>
            {sidebarExpanded && <span>Surveys</span>}
          </div>
          <div className="nav-icon" onClick={() => navigate('/AnnouncementHistory')}>
            <i className="fas fa-bullhorn"></i>
            {sidebarExpanded && <span>Announcements</span>}
          </div>
          <div className="nav-icon" onClick={() => navigate('/AllResidents')}>
            <i className="fas fa-users"></i>
            {sidebarExpanded && <span>View All Residents</span>}
          </div>
        </div>
        <div className="toggle-btn" onClick={handleSidebarToggle}>
          {sidebarExpanded ? '<' : '>'}
        </div>
      </div>
      <div className={`content ${sidebarExpanded ? 'expanded' : ''}`}>
        <div className="container">
          <header className="header">
            <h1>JANAGRAH</h1>
            <p>Empowering Our Community</p>
          </header>
        </div>
        <main className="main">
          {selectedSection === 'about' && (
            <section className="about-section">
              <h2>About Janagrah</h2>
              <p>Janagrah is a resident engagement platform designed to empower residents and strengthen the foundations of our community. We facilitate open communication and informed decision-making by providing a direct line between residents and local authorities.</p>
              <p>Together, we can build a more engaged and informed community.</p>
              <img src={aboutImage} alt="Community Engagement" className="about-image" />
            </section>
          )}
           {selectedSection === 'surveys' && (
            <section className="survey-section">
              <div className="survey-tabs">
                <button onClick={() => navigate('/CreateSurveys')}>Create Survey</button>
                <button onClick={() => navigate('/SurveyPage')}>Surveys Done</button>
              </div>
            </section>
          )}
        </main>
        <footer className="footer">
          <div className="footer-container">
            <p className="copyright">&copy; Janagrah 2024</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default OfficialHome;
