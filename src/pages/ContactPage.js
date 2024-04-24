import React, { useState } from 'react';
import './ContactPage.css'; 

const ContactPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [showSendMessage, setShowSendMessage] = useState(false);


  const handleSendMessage = async (event) => {
    event.preventDefault();
    const message = {
      text: newMessage,
      anonymous: isAnonymous,
    };

    const backendUrl = 'http://your-backend-api-url/messages'; // Added code
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      console.log('Sending message:', message);
      setMessages([...messages, message]);
      console.log('Updated messages:', messages);
      setNewMessage('');
      setMessageSent(true);
      setTimeout(() => setMessageSent(false), 3000); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  return (
    <div className="contactPage">
      <h1>Message History</h1>
      {messages.length > 0 ? (
        <div>
          <ul key={messages.length}>
            {messages.map((msg, index) => (
              <li key={index}>
                {msg.text} ({msg.anonymous ? 'Anonymous' : 'Non-Anonymous'})
              </li>
            ))}
          </ul>
          <button onClick={handleClearHistory}>Clear History</button>
        </div>
      ) : (
        <p>No history</p>
      )}
      <div className="message-container">
        <button
          className={`message-icon ${showSendMessage ? 'active' : ''}`} 
          onClick={() => setShowSendMessage(!showSendMessage)} >
          <i className="fa-brands fa-rocketchat"></i>
        </button>
        {showSendMessage && ( 
          <div className="message-input">
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter your message..."
              />
              <select onChange={(e) => setIsAnonymous(e.target.value === 'anonymous')}>
                <option value="anonymous">Anonymous</option>
                <option value="non-anonymous">Non-Anonymous</option>
              </select>
              <button type="submit">Send</button>
            </form>
            {messageSent && <p>Message Sent</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
