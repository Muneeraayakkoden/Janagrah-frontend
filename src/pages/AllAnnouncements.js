import React, { useState, useEffect } from 'react';
import './AllAnnouncements.css';
import Navbar from '../components/Navbar.js';

const AllAnnouncements = () => {
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
          
          const sortedNews = newsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setNewsData(sortedNews);
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

  return (
    <div className="content-wrapper">
      <Navbar />
      <section className="news-section">
        <div className="news-content">
          <h2 className="section-title">ALL ANNOUNCEMENTS</h2>
          {loading && <p>Loading...</p>}
          {!loading && newsData.length === 0 && <p>No announcements</p>}
          <div className="news-container">
            {newsData.map((newsItem, index) => (
              <div key={index} className="news-item">
                <div className="news-content">
                  <h3>{newsItem.title}</h3>
                  <p>{newsItem.description}</p>
                  {newsItem.image && <img src={newsItem.image} alt={newsItem.title} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllAnnouncements;
