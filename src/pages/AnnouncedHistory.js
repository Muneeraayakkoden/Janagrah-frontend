import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AnnouncedHistory = () => {
  const [announcementHistory, setAnnouncementHistory] = useState([]);
  const [wardid, setWardid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWardid = JSON.parse(localStorage.getItem('username'));
    console.log(storedWardid);
    if (storedWardid) {
      setWardid(storedWardid); // Set wardid state if it exists in local storage
    } else {
      console.error("Required data 'wardId' from local storage is missing.");
    }
  }, []);

  useEffect(() => {
    if (wardid) {
      fetchAnnouncementHistory();
    }
  }, [wardid]);

  const fetchAnnouncementHistory = async () => {
    try {
      if (wardid) {
        const response = await fetch("http://localhost:4000/announcement/show", {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  wardid:wardid,
              }),
        });
        console.log(response);
        if (response.ok) {
              // Handle success
            let responseData = await response.json();
            console.log("All announcement:", responseData);
            if (!Array.isArray(responseData)) {
                  responseData = [responseData];
            }
        
            setAnnouncementHistory(responseData); // Set announcements state
        } else {
            console.error("Failed to fetch announcement");
          }   
      } else{ 
       console.error("Requird data from local storage is missing.");
      }
  }catch(error){
      console.error("Error in try catch block",error.message);
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

  const handleAnnouncement = () => {
    navigate('/CreateAnnouncement');
  };

  return (
    <div className="announcement-history">
      <h2>Announcement History</h2>
      {announcementHistory.length > 0 ? (
        <ul>
          {announcementHistory.map(announcement => (
            <li key={announcement.id}>
              <div className="announcement-details">
              <h3>Title:{announcement.title}</h3>
                <p>Description{announcement.description}</p>
                <p>Created Date: {announcement.createdDate}</p>
              </div>
              <button onClick={() => handleDeleteAnnouncement(announcement.id)}>Delete</button>
            </li>
        ))}
      </ul>
      ) : (
        <p>No announcements to display</p> 
      )}
      <button onClick={handleAnnouncement}>Create Announcement</button>
    </div>
  );
};

export default AnnouncedHistory;
