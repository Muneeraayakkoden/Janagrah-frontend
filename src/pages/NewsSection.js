// NewsSection.jsx
import React, { useState, useEffect } from 'react';
import './NewsSection.css';


const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [remainingNewsData, setRemainingNewsData] = useState([]);

  useEffect(() => {
    // Fetch initial data from the backend when component mounts
    fetchDataFromBackend();
  }, []);
  
  
  const fetchDataFromBackend = async () => {
    try{

        const wardid = JSON.parse(localStorage.getItem('wardid'));
        console.log(wardid)
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
          
          setNewsData(responseData.slice(0, 3)); // Display first 3 news items initially
          setRemainingNewsData(responseData.slice(3)); // Store remaining news items separately
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
  };
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

export default NewsSection;
