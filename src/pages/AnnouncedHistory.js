import React, { useState, useEffect } from 'react';

const AnnouncedHistory = () => {
  const [announcementHistory, setAnnouncementHistory] = useState([]);

  useEffect(() => {
    fetchAnnouncementHistory();
  }, []);

  const fetchAnnouncementHistory = async () => {
    try {
      const response = await fetch("http://localhost:4000/announcement/history");
      if (response.ok) {
        const data = await response.json();
        setAnnouncementHistory(data.history);
      } else {
        console.error("Failed to fetch announcement history.");
      }
    } catch (error) {
      console.error("Error fetching announcement history:", error);
    }
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    try {
      const response = await fetch(`http://localhost:4000/announcement/history/${announcementId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted announcement from the state
        setAnnouncementHistory(prevHistory => prevHistory.filter(item => item.id !== announcementId));
      } else {
        console.error("Failed to delete announcement.");
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div className="announcement-history">
      <h2>Announcement History</h2>
      <ul>
        {announcementHistory.map(announcement => (
          <li key={announcement.id}>
            <div className="announcement-details">
              <h3>{announcement.title}</h3>
              <p>{announcement.description}</p>
              <p>Published on: {announcement.publishDate}</p>
            </div>
            <button onClick={() => handleDeleteAnnouncement(announcement.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncedHistory;
