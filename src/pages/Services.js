// Services.js
import React from 'react';
import Card from '../components/Card';
import './Services.css';

const features = [
  {
    icon: 'fa-chart-line',
    title: 'Share Your Ideas',
    description: 'Participate in surveys and polls to shape local decisions.',
  },
  {
    icon: 'fa-newspaper',
    title: 'Stay Informed',
    description: 'Access the latest news, updates, and announcements from your ward.',
  },
  {
    icon: 'fa-envelope',
    title: 'Connect with Us',
    description: 'Contact your local authorities and ask questions.',
  },
];

const Services = () => {
  return (
    <section className="services">
      <div className="container">
        <h2 className="section-title">Services</h2>
        <div className="feature-cards">
          {features.map((feature, index) => (
            <Card key={index} icon={`fas ${feature.icon}`} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
