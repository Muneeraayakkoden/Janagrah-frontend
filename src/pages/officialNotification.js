import React, { useState, useEffect } from 'react';
import './OfficialNotification.css';
import UserRequests from './UserRequests';

const OfficialNotification = () => {
  const [loginRequests, setLoginRequests] = useState([]);
  const [messages, setMessages] = useState([]);

  // Fetch login requests and messages from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch('/api/login-requests');
        const loginRequestsData = await response1.json();
        setLoginRequests(loginRequestsData);

        const response2 = await fetch('/api/messages');
        const messagesData = await response2.json();
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleApproval = (userId) => {
    // Implement logic to send approval to backend for specific userId
    console.log('Approve user:', userId); // Replace with actual backend call
  };

  const handleRejection = (userId) => {
    // Implement logic to send rejection to backend for specific userId
    console.log('Reject user:', userId); // Replace with actual backend call
  };

  return (
    <div className="notification-page">
      <div className="login">
        <h2>Login Requests</h2>
        <UserRequests />
        {loginRequests.length > 0 ? (
          <ul>
            {loginRequests.map((request) => (
              <li key={request.id}>
                <p>
                  Name: {request.name} (Details hidden for privacy)
                </p>
                <button  className="approve" onClick={() => handleApproval(request.id)}>
                  Approve
                </button>
                <button className="reject" onClick={() => handleRejection(request.id)}>
                  Reject
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">No login requests found.</p>
        )}
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
