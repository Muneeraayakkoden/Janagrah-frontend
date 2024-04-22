// OfficialNotificationPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OfficialNotification.css';

const OfficialNotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:4000/official/notifications');
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
    }
  };

  const handleApprove = (notificationId) => {
    // Handle approval logic
    console.log('Approved notification:', notificationId);
  };

  const handleReject = (notificationId) => {
    // Handle rejection logic
    console.log('Rejected notification:', notificationId);
  };

  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification, index) => (
            <NotificationItem key={index} notification={notification} onApprove={handleApprove} onReject={handleReject} />
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
      <a href="#" className="notification-link" onClick={() => navigate('/OfficialNotificationPage')}>View All Notifications</a>
    </div>
  );
};

const NotificationItem = ({ notification, onApprove, onReject }) => {
  const handleApproveClick = () => {
    onApprove(notification.id);
  };

  const handleRejectClick = () => {
    onReject(notification.id);
  };

  return (
    <li>
      {notification.type === 'login' ? (
        <>
          <span>Resident requested login:</span>
          <button onClick={handleApproveClick}>Approve</button>
          <button onClick={handleRejectClick}>Reject</button>
        </>
      ) : (
        <span>Resident sent a contact message: "{notification.message}"</span>
      )}
    </li>
  );
};

export default OfficialNotificationPage;
