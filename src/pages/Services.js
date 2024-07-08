// Services.js
import React from 'react';
import Card from '../components/Card';
import './Services.css';


const features = [
  {
    icon: 'fa-chart-line',
    title: 'Share Your Ideas',
    description: 'Participate in surveys & polls to shape local decisions.',
  },
  {
    icon: 'fa-newspaper',
    title: 'Stay Informed',
    description: 'Access the latest announcements from your ward.',
  },
  {
    icon: 'fa-envelope',
    title: 'Connect with Us',
    description: 'Contact your local authorities and ask questions.',
  },
];

const Services = () => {
  return (
    <section className="service-section">
      <div>
        <h2 className="section-title">SERVICES</h2>
        <div className="row services_section">
          {features.map((feature, index) => (
            <div key={index} className="col-md-4">
              <Card key={index} icon={`fas ${feature.icon}`} title={feature.title} description={feature.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
