/*import React, { useState, useEffect } from 'react';
import './Announcement.css';

const Announcement = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);

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
          // Sort announcements by createdAt date in descending order
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

  const loadMoreNews = () => {
    // Increase visible count to show all news items
    setVisibleNewsCount(newsData.length);
  };

  const viewLessNews = () => {
    // Reset visible count to show only 3 news items
    setVisibleNewsCount(3);
  };

  return (
    <section className="news-section">
      <div>
        <h2 className="section-title">ANNOUNCEMENTS</h2>
        {loading && <p>Loading...</p>}
        {!loading && newsData.length === 0 && <p>No announcements</p>}
        <div className="news-container">
          {newsData.slice(0, visibleNewsCount).map((newsItem, index) => (
            <div key={index} className="news-item">
              <div className="news-content">
                <h3>{newsItem.title}</h3>
                <p>{newsItem.description}</p>
                {newsItem.image && <img src={newsItem.image} alt={newsItem.title} />}
              </div>
            </div>
          ))}
        </div>
        {newsData.length > visibleNewsCount && visibleNewsCount === 3 ? (
          <button type="button" className="load-more" onClick={loadMoreNews}>Load More</button>
        ) : (
          visibleNewsCount > 3 && 
          <button type="button" className="view-less" onClick={viewLessNews}>View Less</button>
        )}
      </div>
    </section>
  );
}

export default Announcement;*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Announcement.css';

const Announcement = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);
  const navigate = useNavigate();

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
          // Sort announcements by createdAt date in descending order
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

  const loadMoreNews = () => {
    navigate('/AllAnnouncements');
  };

  const viewLessNews = () => {
    setVisibleNewsCount(3);
  };

  return (
    <section className="news-section">
      <div>
        <h2 className="section-title">ANNOUNCEMENTS</h2>
        {loading && <p>Loading...</p>}
        {!loading && newsData.length === 0 && <p>No announcements</p>}
        <div className="news-container">
          {newsData.slice(0, visibleNewsCount).map((newsItem, index) => (
            <div key={index} className="news-item">
              <div className="news-content">
                <h3>{newsItem.title}</h3>
                <p>{newsItem.description}</p>
                {newsItem.image && <img src={newsItem.image} alt={newsItem.title} />}
              </div>
            </div>
          ))}
        </div>
        {newsData.length > visibleNewsCount && visibleNewsCount === 3 ? (
          <button type="button" className="load-more" onClick={loadMoreNews}>Load More</button>
        ) : (
          visibleNewsCount > 3 && 
          <button type="button" className="view-less" onClick={viewLessNews}>View Less</button>
        )}
      </div>
    </section>
  );
}

export default Announcement;



