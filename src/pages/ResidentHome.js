import React from 'react';
import Header from '../components/Header';
import Services from './Services';
import './ResidentHome.css';
import Announcement from './Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const ResidentHome = () => {
  
  return (
    <div className="resident-home"> 
      <Header />
      <Navbar />
      <main className="main-content">
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

