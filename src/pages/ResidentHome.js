import React from 'react';
import Header from '../components/Header';
import Services from './Services';
import ContactPage from './ContactPage';
import NewsSection from './NewsSection';
import Notification from './Notification';
import SurveyPage from './SurveyPage';
import './ResidentHome.css';

const ResidentHome = () => {
  return (
    <div className="resident-home">
      <header>
        <Header />
      </header>

      <main className="main-content">
        <section id="services" className="services-section">
          <Services />
        </section>

        <section id="news" className="news-section">
          <NewsSection />
        </section>

        <section id="notifications" className="notifications-section">
          <Notification />
        </section>

        <section id="survey" className="survey-section">
          <SurveyPage />
        </section>

        <section id="contact" className="contact-section">
          <ContactPage />
        </section>
      </main>
    </div>
  );
};

export default ResidentHome;
