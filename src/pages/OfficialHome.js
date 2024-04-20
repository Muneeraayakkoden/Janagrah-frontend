import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.js';

const OfficialHome = () => {


  return (
    <div>
      <Header />
      <Link
        to={{
          pathname: '/UserRequests',}}
      >
        RESIDENT REQUEST
      </Link>
    </div>
  );
};

export default OfficialHome;
