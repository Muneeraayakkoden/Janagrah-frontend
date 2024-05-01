import React from 'react';
import Header from '../components/Header';
import Services from './Services';
//import './ResidentHome.css';
import { useNavigate } from 'react-router-dom';
import Announcement from './Announcement';
import Footer from '../components/Footer';

const ResidentHome = () => {
  const navigate = useNavigate();

  return (
    <div className="resident-home">
      <Header />
      <main className="main-content">
        <section className="survey-section">
          <div className="survey-card">
            <a href="#" onClick={() => navigate('/dosurvey')}>
              <h3>SURVEYS</h3>
            </a>
          </div>
        </section>

        <section className="Contact-section">
          <div className="contact-card">
            <a href="#" onClick={() => navigate('/ContactPage')}>
              <h3>CONTACT</h3>
              <p>Message the ward member</p>
            </a>
          </div>
        </section>

        <section id="news" className="news-section">
          <Announcement />
        </section>
        <section id="services" className="services-section">
          <Services />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResidentHome;
