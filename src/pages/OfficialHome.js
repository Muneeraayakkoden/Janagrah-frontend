import React from 'react';
import Header from '../components/Header.js';



//import Notification from './Notification.js';

const OfficialHome = (props) => {
  const userData = props.location?.state?.user;

  return (
    <div>
      <Header />
    </div>
  );
};

export default OfficialHome;

