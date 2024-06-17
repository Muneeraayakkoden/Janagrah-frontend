
import React, { useState } from 'react';
import './OfficialNotification.css';
import UserRequests from './UserRequests';
import WardMessage from './WardMessage';
import Officialside from '../components/Officialside';

const OfficialNotification = () => {
  const [displayUserRequests, setDisplayUserRequests] = useState(true);

  return (
    
    <div className="notification-page">
      <Officialside />
      <div className="officialtabs">
        <div className={`tabb ${displayUserRequests ? 'active' : ''}`} onClick={() => setDisplayUserRequests(true)}>
          User Requests
        </div>
        <div className={`tabb ${!displayUserRequests ? 'active' : ''}`} onClick={() => setDisplayUserRequests(false)}>
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

