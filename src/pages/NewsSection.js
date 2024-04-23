// NewsSection.jsx
import React, { useState, useEffect } from 'react';
import './NewsSection.css';

{/*import React from 'react';
import './NewsSection.css';
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
        <button type="submit"className="load-more" >Load More</button>
      </div>
    </section>
  );
}

export default NewsSection;*/}
// NewsSection.js



const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [remainingNewsData, setRemainingNewsData] = useState([]);

  useEffect(() => {
    // Fetch initial data from the backend when component mounts
    fetchDataFromBackend();
  }, []);

  // Function to fetch data from the backend
  const fetchDataFromBackend = () => {
    // Example fetch call - replace with actual fetch call to your backend
    fetch('your-backend-api-url')
      .then(response => response.json())
      .then(data => {
        // Assuming data from backend is an array of news items
        setNewsData(data.slice(0, 3)); // Display first 3 news items initially
        setRemainingNewsData(data.slice(3)); // Store remaining news items separately
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
      });
  };

  // Function to load more news items
  const loadMoreNews = () => {
    setNewsData(prevNewsData => [
      ...prevNewsData,
      ...remainingNewsData.slice(0, 3) // Display next 3 news items
    ]);
    setRemainingNewsData(prevRemainingNewsData => prevRemainingNewsData.slice(3)); // Remove displayed news items from remaining
  };

  return (
    <section className="news-section">
      <div className="container">
        <h2 className="section-title">ANNOUNCEMENTS</h2>
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
        {remainingNewsData.length > 0 && (
          <button type="button" className="load-more" onClick={loadMoreNews}>Load More</button>
        )}
      </div>
    </section>
  );
}

export default NewsSection;
