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

  const handleDelete = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:4000/message/delete`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ msgId: messageId }), // Corrected variable name
      });
      if (response.ok) {
        // Remove the deleted message from the messages list
        setMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
      } else {
        console.error("Failed to delete message");
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  const handleRead = async (messageId) => {
    // Implement functionality to mark message as read
    console.log(`Message ${messageId} marked as read.`);
    try {
      const response = await fetch(`http://localhost:4000/message/read/${messageId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({read: true}), // Corrected variable name
      });
      if (response.ok) {
        // Remove the deleted message from the messages list
        //setMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
        setMessages(prevMessages =>
          prevMessages.map(message =>
            message._id === messageId ? { ...message, read: true } : message
          )
        );
      } else {
        console.error("Failed to delete message");
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }

  };

  return (
    <div className="ward-message-container">
      <h1 className="ward-message-title">Ward Member Messages</h1>
      <ul className="ward-message-list">
        {messages.map(message => (
          <li key={message._id} className="ward-message-item">
            <div>
              <p className="ward-message-content"> {message.message}</p>
              <p className="ward-message-time">Date : {message.createdAt}</p>
              {message.anonymous ? (
                <p className="ward-message-private">PRIVATE</p>
              ) : (
                <p className="ward-message-user-id">User ID : {message.userid}</p>
              )}  
              {message.read ? (
                <p className="ward-message-read">Viewed</p>
              ):(
                  <p className="ward-message-unread"> Unread</p>
              )}
            </div>
            
             <button className="delete-button" onClick={() => handleDelete(message._id)}>Delete</button>
             <button className="read-button" onClick={() => handleRead(message._id)}>Read</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WardMessage;
