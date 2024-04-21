// NotificationPage.js seen by the official
import React, { useState, useEffect } from 'react';
import './NotificationPage.css';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend when the component mounts
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

  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))}
      </ul>
    </div>
  );
};

const NotificationItem = ({ notification }) => {
  const handleApprove = () => {
    // Handle approval logic
  };

  const handleReject = () => {
    // Handle rejection logic
  };

  return (
    <li>
      {notification.type === 'login' ? (
        <>
          <span>Resident requested login:</span>
          <button onClick={handleApprove}>Approve</button>
          <button onClick={handleReject}>Reject</button>
        </>
      ) : (
        <span>Resident sent a contact message: "{notification.message}"</span>
      )}
    </li>
  );
};

export default NotificationPage;
