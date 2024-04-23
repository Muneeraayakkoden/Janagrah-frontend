// NewsSection.jsx

import React from 'react';
import './NewsSection.css';
import { useNavigate } from 'react-router-dom';

const newsData = [
  {
    id: 1,
    title: "Local Community Center Reopens After Renovation",
    description: "The local community center, which has been closed for renovation for the past six months, is set to reopen its doors to the public next week. The renovated center boasts upgraded facilities...",
    imageUrl: "images/community_center.jpg",
    link: "#"
  },
  {
    id: 2,
    title: "New Playground Opens in Neighborhood Park",
    description: "Exciting news for families in the neighborhood! A brand new playground has been unveiled in the local park. The playground features state-of-the-art equipment...",
    imageUrl: "images/playground.jpg",
    link: "#"
  },
  {
    id: 3,
    title: "Community Cleanup Day a Success",
    description: "Last Saturday's community cleanup day was a resounding success, with volunteers coming together to beautify our neighborhood. Participants picked up litter, planted trees...",
    imageUrl: "images/cleanup.jpg",
    link: "#"
  },
];



const NewsSection = () => {
  const navigate = useNavigate();
    const handleButtonClick = () => {
      navigate('/Announcement')
    };

  return (
    <section className="news-section">
      <div className="container">
        <h2>NEWS BOARD</h2>
        <div className="news-container">
          {newsData.map(newsItem => (
            <div key={newsItem.id} className="news-item">
              <img src={newsItem.imageUrl} alt="News" className="news-image" />
              <div className="news-content">
                <h3>{newsItem.title}</h3>
                <p>{newsItem.description}</p>
                <a href={newsItem.link} className="read-more">Read More</a>
              </div>
            </div>
          ))}
        </div>
        <button type="submit"className="load-more" onClick={handleButtonClick}>Load More</button>
      </div>
    </section>
  );
}

export default NewsSection;
