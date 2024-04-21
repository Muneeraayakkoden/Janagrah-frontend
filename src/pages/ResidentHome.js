import React from 'react';
import Header from '../components/Header';
import Services from './Services';
import NewsSection from './NewsSection';
import './ResidentHome.css';
import { useNavigate } from 'react-router-dom';


const ResidentHome = () => {
  const navigate = useNavigate();

  return (
    <div className="resident-home">
      <header>
        <Header />
      </header>

      <main className="main-content">
        <section className="survey-section">
          <div className="survey-card">
            <a href="#" onClick={() => navigate('/SurveyPage')}>
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

        <section id="services" className="services-section">
          <Services />
        </section>

        <section id="news" className="news-section">
          <NewsSection />
        </section>

      </main>
    </div>
  );
};

export default ResidentHome;
