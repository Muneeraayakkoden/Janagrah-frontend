import React, { useState, useEffect } from 'react';
import './ContactPage.css'; 


const ContactPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [showSendMessage, setShowSendMessage] = useState(false);

  const wardid = JSON.parse(localStorage.getItem('wardmemberid'));
  console.log(wardid);
  const name = JSON.parse(localStorage.getItem('username'));
  console.log(name);
  useEffect(() => {
    // Function to fetch messages from the backend when component mounts
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:4000/messages/send',{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name:name,
            wardid:wardid,
            
            description:formData.description

          }),
        });
       // Replace URL with your backend endpoint
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages); // Assuming the response contains an array of messages
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
  };

  
        

    // Call the fetchMessages function
    fetchMessages();
  }, []); // Empty dependency array to ensure this effect runs only once when the component mounts

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

  return (
    <div className="contactPage">
      <h1>Message History</h1>
      {messages.length > 0 ? (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              {msg.text} - {msg.anonymous ? 'Anonymous' : 'Non-Anonymous'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No history</p>
      )}
      <div className="message-container">
        <button
          className={`message-icon ${showSendMessage ? 'active' : ''}`} // **Modified class logic**
          onClick={() => setShowSendMessage(!showSendMessage)} >
          <i class="fa-brands fa-rocketchat"></i>
        </button>
        {showSendMessage && ( // **Conditional rendering based on state**
          <div className="message-input">
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter your message"
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
