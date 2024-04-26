// NewsSection.jsx
import React, { useState, useEffect } from 'react';
import './Announcement.css';

const Announcement = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const fetchDataFromBackend = async () => {
    try {
      const wardid = JSON.parse(localStorage.getItem('wardmemberid'));

      if (wardid) {
        const response = await fetch("http://localhost:4000/announcement/send", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            wardid,
          }),
        });

        if (response.ok) {
          const responseData = await response.json();
          const newsArray = Array.isArray(responseData.msg) ? responseData.msg : [responseData.msg];
          setNewsData(newsArray);
        } else {
          console.log("Failed to fetch announcement");
        }
      } else {
        console.error("Required data from local storage is missing.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreNews = () => {
    // Load next 3 news items
    const nextNews = newsData.slice(newsData.length, newsData.length + 3);
    setNewsData(prevNewsData => [...prevNewsData, ...nextNews]);
  };

  return (
    <section className="news-section">
      <div className="container">
        <h2 className="section-title">ANNOUNCEMENTS</h2>
        {loading && <p>Loading...</p>}
        {!loading && newsData.length === 0 && <p>No announcements</p>}
        <div className="news-container">
          {newsData.map((newsItem, index) => (
            <div key={index} className="news-item">
              <div className="news-content">
                <h3>{newsItem.title}</h3>
                <p>{newsItem.description}</p>
                {newsItem.image && <img src={newsItem.image} alt={newsItem.title} />}
                <a href={newsItem.link} className="read-more">Read More</a>
              </div>
            </div>
          ))}
        </div>
        {newsData.length > 3 && (
          <button type="button" className="load-more" onClick={loadMoreNews}>Load More</button>
        )}
        
      </div>
    </section>
  );
}

export default Announcement;

