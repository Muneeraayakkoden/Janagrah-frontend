
import React, { useState } from 'react';
import './officialNotification.css';
import UserRequests from './UserRequests';
import WardMessage from './WardMessage';


const OfficialNotification = () => {
  const [displayUserRequests, setDisplayUserRequests] = useState(true);

  return (
    <div className="notification-page">
      <div className="tabs">
        <div className={`tab ${displayUserRequests ? 'active' : ''}`} onClick={() => setDisplayUserRequests(true)}>
          User Requests
        </div>
        <div className={`tab ${!displayUserRequests ? 'active' : ''}`} onClick={() => setDisplayUserRequests(false)}>
          Messages
        </div>
      </div>

      <div className="content">
        {displayUserRequests ? <UserRequests /> : <WardMessage />}
      </div>
    </div>
  );
};

export default OfficialNotification;

