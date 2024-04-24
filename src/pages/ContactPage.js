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
    // Replace with actual backend call to send message
    console.log('Sending message:', message);
    setMessages([...messages, message]);
    setNewMessage('');
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000); // Hide message sent notification after 3 seconds
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  return (
    <div className="contactPage">
      <h1>Message History</h1>
      {messages.length > 0 ? (
        <div>
          <ul>
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
          <i class="fa-brands fa-rocketchat"></i>
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
