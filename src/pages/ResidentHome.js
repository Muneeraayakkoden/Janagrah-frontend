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

      <div className="survey-section">
          <button className="survey-btn" onClick={() => {
            navigate('/SurveyPage');
          }}>Survey</button>
        </div>

        <div>
          <button className="contact-btn" onClick={() => {
            navigate('/ContactPage');
          }}>Contact</button>
        </div>

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
