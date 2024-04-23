import React, { useState, useEffect } from 'react';

const AnnouncementList = ({ announcements }) => {
    console.log("Announcements:", announcements); // Add this line for debugging
    return (
      <div>
        <h2>All Announcements</h2>
        <ul>
          {announcements.map(announcement => (
            <li key={announcement.id}>
              <h3>{announcement.title}</h3>
              <p>{announcement.content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const wardid = JSON.parse(localStorage.getItem('username'));
        if (wardid) {
          const response = await fetch("http://localhost:4000/announcement/send", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              wardid: wardid,
            }),
          });
          if (response.ok) {
            const responseData = await response.json();
            setAnnouncements(responseData); // Set announcements here
          } else {
            console.log("Failed to fetch announcements");
          }
        } else {
          console.error("Required data from local storage is missing.");
        }
      } catch (error) {
        console.log("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements(); // Call the fetchAnnouncements function
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div>
      <AnnouncementList announcements={announcements} />
    </div>
  );
};

export default Announcement;
