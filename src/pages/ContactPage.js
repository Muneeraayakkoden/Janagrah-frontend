import React, { useState , useEffect} from 'react';
import './ContactPage.css'; 
import { FaPen, FaTrash } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import Navbar from '../components/Navbar';

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
 
  const handleDeleteMessage = (indexToDelete) => {
    const updatedMessages = messages.filter((_, index) => index !== indexToDelete);
    setMessages(updatedMessages);
  };

  return (
    <div className="contactPage">
      <Navbar />
      {messages.length > 0 ? (
        <div className="Container">
          <h1 className='heading'>Message History</h1>
          <div className="item" key={messages.length}>
            {messages.map((msg, index) => (
              <div key={index}>
                <div className="message-content">
                  <p className='chat'><b>{msg.message}</b></p>
                  <p>{msg.anonymous ? 'Private' : 'Public'}</p>
                  <p className='chatTime'>{msg.createdAt}</p>
                  <p className={msg.read ? 'Seen' : 'not-seen'}>{msg.read ? 'Viewed' : 'Unread'}</p>
                  <FaTrash onClick={() => handleDeleteMessage(index)} className="trash-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No history</p>
      )}
      <div className="message-container">
      <h1 className='heading'>Write a Message</h1>
        <button id="contact"
          className={`message-icon ${showSendMessage ? 'active' : ''}`} 
          onClick={() => setShowSendMessage(!showSendMessage)} >
          <FaPen />
        </button>
        {showSendMessage && ( 
          <div className="message-input">
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter your message..."
                required
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
              <button className="send" type="submit"><IoIosSend /> Send</button>
            </form>
            {messageSent && <p className="success">Message Sent Successfully</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;