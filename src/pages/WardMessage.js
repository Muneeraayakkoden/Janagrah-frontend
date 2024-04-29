import React, { useState, useEffect } from 'react';
import './WardMessage.css'; // Import the CSS file

const WardMessage = () => {
  const [messages, setMessages] = useState([]);
  const wardid = JSON.parse(localStorage.getItem('username'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch messages
        if (wardid) {
          const response = await fetch("http://localhost:4000/message/visible", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              wardid: wardid,
            }),
          });
          if (response.ok) {
            const data = await response.json();
            setMessages(data.userMsg);
          } else {
            console.error("Failed to fetch messages");
          }
        } else {
          console.error("Required data from local storage is missing.");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [wardid]);

  return (
    <div className="ward-message-container">
      <h1 className="ward-message-title">Ward Member Messages</h1>
      <ul className="ward-message-list">
        {messages.map(message => (
          <li key={message._id} className="ward-message-item">
            <p className="ward-message-content">{message.message}</p>
            <p className="ward-message-time">{message.createdAt}</p>
            {message.anonymous ? (
              <p className="ward-message-private">PRIVATE</p>
            ) : (
              <p className="ward-message-user-id">User ID: {message.userid}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WardMessage;
