import React, { useState, useEffect } from 'react';
import './ContactPage.css'; 

{/*function ContactPage() {
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    // Fetch message history when component mounts
    fetchMessageHistory();
  }, []);


  const handleAnonymousChange = (event) => {
    setIsAnonymous(event.target.id === 'anonymous');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can handle the submission of the message, considering the 'message' and 'isAnonymous' states
    try {
      const response = await fetch('http://localhost:4000/official/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          message: message,
          isAnonymous: isAnonymous,
        }),
      });
      if (response.ok) {
        // If message is sent successfully, add it to message history
        const newMessage = {
          message: message,
          isAnonymous: isAnonymous,
        };
        setMessageHistory(prevHistory => [...prevHistory, newMessage]);
        // Reset message input
        setMessage('');
      } else {
        console.error('Failed to send message. Status:', response.status);
      }
      // Reset message input
    } catch (error) {
      console.error('Error sending notification:', error.message);
    }
  };

    const fetchMessageHistory = async () => {
      try {
        // Fetch message history from server
        const response = await fetch('http://localhost:4000/official/messages');
        if (response.ok) {
          const data = await response.json();
          setMessageHistory(data.messages);
        } else {
          console.error('Failed to fetch message history. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching message history:', error.message);
      }
    };

  return (
    <div className="ContactPage">
      <div className="contact-container">

      <div className="Message-History">
          <h2>Message History</h2>
          <ul>
            {messageHistory.map((msg, index) => (
              <li key={index}>
                <span>{msg.message}</span>
                <span>{msg.isAnonymous ? ' - Anonymous' : ' - Non-anonymous'}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="Direct-Communication">
          <h2>Contact Ward Member</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message here..."
              rows="4"
            ></textarea>
            <div className="anonymous-option">
              <input
                type="radio"
                id="nonAnonymous"
                name="messageType"
                value="s"
                checked={!isAnonymous}
                onChange={handleAnonymousChange}
              />
              <label htmlFor="nonAnonymous">Non-anonymous</label>
              <input
                type="radio"
                id="anonymous"
                name="messageType"
                value="s"
                checked={isAnonymous}
                onChange={handleAnonymousChange}
              />
              <label htmlFor="anonymous">Anonymous</label>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default ContactPage; */}


/*function ContactPage() {
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);
  const [showMessageInput, setShowMessageInput] = useState(false);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    // Fetch message history when component mounts
    fetchMessageHistory();
  }, []);

  const handleAnonymousChange = (event) => {
    setIsAnonymous(event.target.id === 'anonymous');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can handle the submission of the message, considering the 'message' and 'isAnonymous' states
    try {
      const response = await fetch('http://localhost:4000/official/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          message: message,
          isAnonymous: isAnonymous,
        }),
      });
      if (response.ok) {
        // If message is sent successfully, add it to message history
        const newMessage = {
          message: message,
          isAnonymous: isAnonymous,
        };
        setMessageHistory(prevHistory => [...prevHistory, newMessage]);
        // Reset message input
        setMessage('');
      } else {
        console.error('Failed to send message. Status:', response.status);
      }
    } catch (error) {
      console.error('Error sending notification:', error.message);
    }
  };

  const fetchMessageHistory = async () => {
    try {
      // Fetch message history from server
      const response = await fetch('http://localhost:4000/official/messages');
      if (response.ok) {
        const data = await response.json();
        setMessageHistory(data.messages);
      } else {
        console.error('Failed to fetch message history. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching message history:', error.message);
    }
  };

  return (
    <div className="ContactPage">
      <div className="contact-container">
        <div className="Message-History">
          <h2>Message History</h2>
          {messageHistory.length > 0 ? (
            <ul>
              {messageHistory.map((msg, index) => (
                <li key={index}>
                  <span>{msg.message}</span>
                  <span>{msg.isAnonymous ? ' - Anonymous' : ' - Non-anonymous'}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No history</p>
          )}
        </div>

        {showMessageInput ? (
          <div className="Direct-Communication">
            <h2>Contact Ward Member</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={message}
                onChange={handleMessageChange}
                placeholder="Type your message here..."
                rows="4"
              ></textarea>
              <div className="anonymous-option">
                <input
                  type="radio"
                  id="nonAnonymous"
                  name="messageType"
                  value="s"
                  checked={!isAnonymous}
                  onChange={handleAnonymousChange}
                />
                <label htmlFor="nonAnonymous">Non-anonymous</label>
                <input
                  type="radio"
                  id="anonymous"
                  name="messageType"
                  value="s"
                  checked={isAnonymous}
                  onChange={handleAnonymousChange}
                />
                <label htmlFor="anonymous">Anonymous</label>
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        ) : (
          <div className="Message-Input-Icon" onClick={() => setShowMessageInput(true)}>
            <img src="message-icon.png" alt="Message Icon" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactPage; */

const ContactPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [showSendMessage, setShowSendMessage] = useState(false);

  const handleSend = () => {
    const message = {
      text: newMessage,
      anonymous: isAnonymous
    };
    setMessages([...messages, message]);
    setNewMessage('');
    setMessageSent(true);
  };

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
