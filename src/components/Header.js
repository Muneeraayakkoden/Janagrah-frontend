import React from 'react';

import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {

  return (
    <header className="rheader">
      <div className="row">
        <div className="col-md">
          <h1 className="title">JANAGRAH</h1>
          <h3 className="hero-title">Connecting Community</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
