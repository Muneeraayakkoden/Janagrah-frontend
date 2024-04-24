import React, { useEffect } from 'react';
import './OfficialHome.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

  // Replace with your actual API endpoint and data fetching logic
  const API_ENDPOINT = '/api/official/notifications';


function OfficialHome() {
  const navigate = useNavigate();
  
  const handleNotificationClick = () => {
    navigate('/OfficialNotification');
  };

  const handleProfileClick = () => {
    navigate('/MemberAccount');
  };

  const fetchNotifications = async () => {
    
    try {
      const response = await fetch(API_ENDPOINT);
      if (response.ok) {
        console.log('Notifications fetched successfully');
      } else {
        console.error('Failed to fetch notifications:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  
  // Fetch notifications on initial render
  const handleAnnounceEvent = () => {
    navigate('/CreateUpdates');
  };
  
  return (
    <div className="official-homepage">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Janagrah Logo" />
        </div>
        <header className="header">
          <h1>Janagrah</h1>
          <p>Empowering Our Community</p>
        </header>
        <div className="profile">
          <i class="fa-solid fa-user" onClick={handleProfileClick}></i>
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
              <p>Design and launch surveys to gather resident feedback.</p>
            </a>
            <a href="#" className="survey-card" onClick={(e) => navigate('SurveyPage', e)}>
              <h3>SURVEYS DONE</h3>
              <p>Analyze resident responses and gain valuable insights.</p>
            </a>
          </div>
        </section>

        <section className="updates-section">
          <h2>SEND ANNOUNCEMENTS</h2>
          <div className="updates-cards">
            <a href="#" className="updates-card" onClick={handleAnnounceEvent}>
              <h3>Announce an event</h3>
            </a>
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

export default OfficialHome;
