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
      <header className="header">
          <Header/>
        <nav className="navbar">
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#notifications">Notifications</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
        <section id="services" className="services-section">
          <Services />
        </section>

        <section id="news" className="news-section">
          <NewsSection />
        </section>

        <section id="notifications" className="notifications-section">
          <Notification />
        </section>

        <section id="contact" className="contact-section">
          <ContactPage />
        </section>

        <section id="survey" className="survey-section">
          <SurveyPage />
        </section>
    </div>
  );
};

export default ResidentHome;
