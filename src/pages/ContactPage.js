import React, { useState } from 'react';
import './ContactPage.css'; // Assuming you have a CSS file for ContactPage styling

function ContactPage() {
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleAnonymousChange = (event) => {
    setIsAnonymous(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission of the message, considering the 'message' and 'isAnonymous' states
    console.log("Message:", message);
    console.log("Is Anonymous:", isAnonymous);
    // Reset the message input after submission
    setMessage('');
  };

  return (
    <div className="ContactPage">
      <div className="contact-container">
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
                value="nonAnonymous"
                checked={!isAnonymous}
                onChange={handleAnonymousChange}
              />
              <label htmlFor="nonAnonymous">Non-anonymous</label>
              <input
                type="radio"
                id="anonymous"
                name="messageType"
                value="anonymous"
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

export default ContactPage;
