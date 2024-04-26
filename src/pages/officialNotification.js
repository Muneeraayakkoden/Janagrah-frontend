import React, { useState, useEffect } from 'react';
import './OfficialNotification.css';
import UserRequests from './UserRequests';

const OfficialNotification = () => {
  const [messages, setMessages] = useState([]);
  const [loginRequests, setLoginRequests] = useState([]);
  // Fetch login requests and messages from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch('/api/login-requests');
        const loginRequestsData = await response1.json();
        setLoginRequests(loginRequestsData);

        const response2 = await fetch('http://localhost:4000/message/send');
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
        <UserRequests loginRequests={loginRequests}/>
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
