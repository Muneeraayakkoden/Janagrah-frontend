import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AnnouncementHistory.css';
import Officialside from '../components/Officialside.js';
import { MdDelete } from "react-icons/md";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState(null);

  const wardid = JSON.parse(localStorage.getItem('username'));
  console.log(wardid);

  useEffect(() => {
    if (wardid) {
      fetchAnnouncements();
    } else {
      console.error("Required data from local storage is missing.");
    }
  }, [wardid]);

  const fetchAnnouncements = async () => {
    try {
      if (wardid) {
        const response = await fetch("http://localhost:4000/announcement/show", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            wardid: wardid,
          }),
        });
        console.log(response);
        if (response.ok) {
          const Data = await response.json();
          console.log("All announcement:", Data);
          console.log(Data.msg);
          // Sort announcements by createdAt date in descending order
          const sortedAnnouncements = Data.msg.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setAnnouncements(sortedAnnouncements); 
        } else {
          console.error("Failed to fetch announcement");
        }
      } else {
        console.error("Required data from local storage is missing.");
      }
    } catch (error) {
      console.error("Error in try catch block", error.message);
    }
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this announchement?");
    if(!userConfirmed){
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/announcement/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ msgId: announcementId }),
      });
      if (response.ok) {
        // Remove the deleted announcement from the state
        setAnnouncements(prevAnnouncements => prevAnnouncements.filter(announcement => announcement._id !== announcementId));
      } else {
        console.error("Failed to delete announcement.");
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const toggleDescription = (index) => {
    if (expandedDescription === index) {
      setExpandedDescription(null);
    } else {
      setExpandedDescription(index);
    }
  };

  return (
    <div className="announcement-page-container">
      <div className="announcement-sidebar">
        <Officialside />
      </div>
      <div className="announcement-main-content">
        <h1 id="www">ANNOUNCEMENTS</h1>
        <Link to="/CreateAnnouncement" className="announcement-link">
          <button className="announcement-button">Create Announcement</button>
        </Link>
        {announcements.length > 0 ? (
          <div>
            {announcements.map((announcement, index) => (
              <div key={index} className="announcement-item">
                <p className="announcement-title">{index + 1}. Title: {announcement.title}</p>
                <p className="announcement-description"
                  data-fulltext={announcement.description}
                  onClick={() => toggleDescription(index)}>
                  Description: {expandedDescription === index ? announcement.description : `${announcement.description.substring(0, 40)}...`}
                </p>
                <p className="announcement-date">Date: {announcement.createdAt}</p>
                <button className="announcement-deletebutton" onClick={() => handleDeleteAnnouncement(announcement._id)}><MdDelete className='announcement-deletebuttonIcon' size={24} /></button>
              </div>
            ))}
          </div>
        ) : (
          <p>No announcements to display</p>
        )}
      </div>
    </div>
  );
};

export default Announcements;
