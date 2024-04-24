// NewsSection.jsx
import React, { useState, useEffect } from 'react';
import './Announcement.css';
import { useNavigate } from 'react-router-dom';

/*const Announcement = () => {
  const [newsData, setNewsData] = useState([]);
  const [remainingNewsData, setRemainingNewsData] = useState([]);

  useEffect(() => {
    // Fetch initial data from the backend when component mounts
    fetchDataFromBackend();
  }, []);
  const wardid = JSON.parse(localStorage.getItem('wardmemberid'));
  console.log(wardid);
  
  const fetchDataFromBackend = async () => {
    try{


        // Check if all required data is available
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
          // Handle success
          const responseData = await response.json();
          console.log("Response Data from backend:", responseData); // Log response data
          
          // Convert responseData.msg to an array if it's not already an array
          const newsArray = Array.isArray(responseData.msg) ? responseData.msg : [responseData.msg];

          setNewsData(newsArray.slice(0, 3)); // Display first 3 news items initially
          setRemainingNewsData(newsArray.slice(3)); // Store remaining news items separately
        } else {
          // Handle error
          console.log("Failed to fetch announcement");
          //setAnnouncementSent(false);
        }
      } else {
        console.error("Required data from local storage is missing.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };*/
    // Example fetch call - replace with actual fetch call to your backend
    /*fetch('http://localhost:4000/announcement/send')
      .then(response => response.json())
      .then(data => {
        // Assuming data from backend is an array of news items
        setNewsData(data.slice(0, 3)); // Display first 3 news items initially
        setRemainingNewsData(data.slice(3)); // Store remaining news items separately
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
      });*/

/*
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
            <div  className="news-item">

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

export default Announcement;*/


const Announcement = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

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
        <button type="button" classname="Announced-history" onClick={() => {navigate('/AnnouncedHistory')}}>Announced Events</button>
      </div>
    </section>
  );
}

export default Announcement;

