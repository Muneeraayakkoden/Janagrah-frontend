import React, { useState , useEffect} from 'react';
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
  useEffect(() => {
    fetchMessageHistory();
  }, []);



  const fetchMessageHistory = async () => {
    try {
      const response = await fetch('http://your-backend-api-url/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      } else {
        console.error('Failed to fetch message history. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching message history:', error.message);
    }
  };

  
        

    // Call the fetchMessages function
    fetchMessages();
  }, []);
} // Empty dependency array to ensure this effect runs only once when the component mounts

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const message = {
      text: newMessage,
      anonymous: isAnonymous,
    };

    const backendUrl = 'http://your-backend-api-url/messages';
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
      setNewMessage('');
      setMessageSent(true);
      setTimeout(() => setMessageSent(false), 3000); 
      fetchMessageHistory();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleClearHistory = async () => {
    try {
      const response = await fetch('http://your-backend-api-url/messages/clear', {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessages([]);
        console.log('Message history cleared successfully.');
      } else {
        console.error('Failed to clear message history. Status:', response.status);
      }
    } catch (error) {
      console.error('Error clearing message history:', error.message);
    }
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
              <div className="anonymous-option">
                <input
                  type="radio"
                  id="nonAnonymous"
                  name="messageType"
                  value="s"
                  checked={!isAnonymous}
                  onChange={() => setIsAnonymous(false)}
                />
                <label htmlFor="nonAnonymous">Non-anonymous</label>
                <input
                type="radio"
                id="anonymous"
                name="messageType"
                value="s"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(true)}
                />
                <label htmlFor="anonymous">Anonymous</label>
              </div>
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
