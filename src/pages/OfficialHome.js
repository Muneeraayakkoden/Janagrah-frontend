import React, { useEffect } from 'react';
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
            <a href="#" className="updates-card" onClick={(e) => navigate('/Announcements')}>
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

export default OfficialHome;
