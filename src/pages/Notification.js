// Notification.js

import React from 'react';
import './Notification.css'; 

const notifications = [
  "New feature added: Introducing dark mode for improved readability at night.",
  "Upcoming event: Join us for a community cleanup drive on Saturday, April 30th.",
  "System maintenance: Our website will be undergoing maintenance on Monday, May 2nd, from 9:00 PM to 11:00 PM.",
  "Important update: Please review the revised terms and conditions of service.",
  "Thank you for your feedback! We appreciate your input in making our platform better for everyone."
];

function Notification() {
  return (
    <div className="Notification">
      <h2>NOTIFICATIONS</h2>
      <div className="notification-container">
        {notifications.map((notification, index) => (
          <div className="notification" key={index}>
            <p>{notification}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
