import React, { useState , useEffect} from 'react';
import './ContactPage.css'; 


const ContactPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [showSendMessage, setShowSendMessage] = useState(false);


  const userid = JSON.parse(localStorage.getItem('username'));
  const wardid = JSON.parse(localStorage.getItem('wardmemberid'));
 
  useEffect(() => {
    fetchMessageHistory();
  }, []);

  const handleAnonymousChange = (event) => {
    setIsAnonymous(event.target.value === 'false');
  };

  const fetchMessageHistory = async () => {
    try {
      console.log(userid);
      const response = await fetch('http://localhost:4000/message/show',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid}),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.userMsg);
        setMessages(data.userMsg);
      } else {
        console.error('Failed to fetch message history. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching message history:', error.message);
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const messageData = {
      userid: userid,
      wardid: wardid,
      message: newMessage,
      anonymous: isAnonymous,
    };

    const backendUrl = "http://localhost:4000/message/send";
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      const responseData = await response.json();
      console.log(responseData);
      setMessages([...messages, responseData.msg]);
      setNewMessage('');
      setMessageSent(true);
      setTimeout(() => setMessageSent(false), 10000); 
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  /*const handleClearHistory = async () => {
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
  };*/

  return (
    <div className="contactPage">
      <h1>Message History</h1>
      {messages.length > 0 ? (
        <div>
          <ul key={messages.length}>
            {messages.map((msg, index) => (
              <li key={index}>
                <div>
                <p>Message: {msg.message}</p>
                <p>Time: {msg.createdAt}</p>
                <p>Anonymous: {msg.anonymous ? 'Yes' : 'No'}</p>
                <p className={msg.read ? 'Seen' : 'not-seen'}>{msg.read ? 'Seen' : 'Unseen'}</p>

              </div>
              </li>
            ))}
          </ul>
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
                  value="true"
                  checked={!isAnonymous}
                  onChange={handleAnonymousChange}
                />
                <label htmlFor="nonAnonymous">Non-anonymous</label>
                <input
                type="radio"
                id="anonymous"
                name="messageType"
                value="false"
                checked={isAnonymous}
                onChange={handleAnonymousChange}
                />
                <label htmlFor="anonymous">Anonymous</label>
              </div>
              <button type="submit">Send</button>
            </form>
            {messageSent && <p classNAme="success">Message Sent Successfully</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;