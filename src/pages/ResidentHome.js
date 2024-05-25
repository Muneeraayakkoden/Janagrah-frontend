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
      <div className="piano1">
        <Navbar />
      </div>
      <div className="piano2">
        <Header />
        <main className="main-content">
          <section className="aboutUs-section">
            <h2 className="section-title">ABOUT US</h2>
            <div className = "para"> 
              <p>Janagrah is a resident engagement platform designed to empower residents and strengthen the foundations of our community. We facilitate open communication and informed decision-making by providing a direct line between residents and local authorities.</p>
              <p>Together, we can build a more engaged and informed community.</p>
            </div>
          </section>
          <section id="news" className="newses-section">
            <Announcement />
          </section>
          <section id="services" className="services-section">
            <Services />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ResidentHome;

