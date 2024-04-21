import React, { useState, useEffect } from 'react';
import './OfficialHome.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';


// Replace with your actual API endpoint and data fetching logic
const API_ENDPOINT = '/api/official/notifications';

function OfficialHome() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    // Fetch notifications on click (optional)
    fetchNotifications();
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []); // Fetch notifications on initial render

  return (
    <div className="official-homepage">
       <div className="logo">
          <img src={logo} alt="Janagrah Logo" />
        </div>
      <header className="header">
        <h1>Janagrah</h1>
        <p>Empowering Our Community</p>
      </header>

      <main className="main">

        <section className="survey-section">
          <h2>SURVEY SECTION</h2>
          <div className="survey-cards">
            <a href="#" className="survey-card" onClick={(e) => {e.preventDefault(); navigate('/CreateSurveys');}}>
              <h3>Create Survey</h3>
              <p>Design and launch surveys to gather resident feedback.</p>
            </a>
            <a href="#" className="survey-card" onClick={(e) => navigate('/Results', e)}>
              <h3>View Results</h3>
              <p>Analyze resident responses and gain valuable insights.</p>
            </a>
          </div>
        </section>

        <section className="updates-section">
          <h2>SEND ANNOUNCEMENTS</h2>
          <div className="updates-cards">
            <a href="#" className="updates-card" onClick={(e) => e.navigate('/CreateUpdates')}>
              <h3>Announce an event</h3>
            </a>
          </div>
        </section>

      </main>
      <footer className="footer">
        <p>&copy; Janagrah 2024</p>
      </footer>
      <div className="notification-bell" onClick={(e) => { e.preventDefault(); navigate('/Notifications', e); }}>
      <i className="fas fa-bell"></i>
      </div>
      {showNotifications && (
        <div className="notification-content">
          <h2>Notifications</h2>
          {notifications.length > 0 ? (
            <ul>
              {/* Map through notifications and display content */}
              {notifications.map((notification) => (
                <li key={notification.id}>
                  {/* Display notification title, description, etc. */}
                  <h3>{notification.title}</h3>
                  <p>{notification.description}</p>
                  {/* Add buttons or links for further actions (optional) */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default OfficialHome;

