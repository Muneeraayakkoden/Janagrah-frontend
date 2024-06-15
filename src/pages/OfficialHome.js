import React from 'react';
import './OfficialHome.css';
import OfficialSide from '../components/Officialside'; 


function OfficialHome() {

  return (
    <div className="official-homepage">
      <OfficialSide />
      <div className="content">
        <div className="container">
          <header className="headerr">
            <h1>JANAGRAH</h1>
            <p>Empowering Our Community</p>
          </header>
        </div>
        <main className="main">

  </main>
  <footer className="footer">
          <div className="footer-container">
            <p className="copyright">&copy; Janagrah 2024</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default OfficialHome;