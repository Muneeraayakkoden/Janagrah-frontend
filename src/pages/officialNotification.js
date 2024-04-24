import React, { useState, useEffect } from 'react';
import './OfficialNotification.css';
import UserRequests from './UserRequests';

const OfficialNotification = () => {
  const [messages, setMessages] = useState([]);

  // Fetch login requests and messages from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await fetch('/api/messages');
        const messagesData = await response2.json();
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="notification-page">

      <div className="login">
        <h2>User Requests</h2>
        <UserRequests />
      </div>

      <div className="message">
        <h2>Messages</h2>
        {messages.length > 0 ? (
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                {message.isAnonymous ? (
                  <p>Anonymous Message: {message.content}</p>
                ) : (
                  <p>
                    {message.name}: {message.content}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default OfficialNotification;
