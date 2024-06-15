/*import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AnnouncementHistory.css'
import Officialside from '../components/Officialside.js';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]); 
    
  const wardid = JSON.parse(localStorage.getItem('username'));
  console.log(wardid);

  useEffect(() => {
 
    if (wardid) {
      fetchAnnouncements();
    } else {
      console.error("Required data  from local storage is missing.");
    }
  }, [wardid]);

  const fetchAnnouncements = async () => {
        try {
            if ( wardid) {
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
                  const Data = await response.json();
                  console.log("All announcement:",Data);
                 
                  console.log(Data.msg);
                  setAnnouncements(Data.msg); // Set announcements state
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


  /*const deleteAnnouncement = async (id) => {
    try {
      await fetch(`api/announcements/${id}`, {
        method: 'DELETE',
      });
      // Filter out the deleted announcement from the list
      setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };*//*
  const handleDeleteAnnouncement = async (announcementId) => {
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

  return (

    <div>
      <Officialside/>
      <h1>Announcements</h1>
      <Link to="/CreateAnnouncement">
        <button>Create Announcement</button>
      </Link>
      {announcements.length > 0 ? (
       
        <ul>
          {announcements.map((announcement,index) => (
            <li key={index} className="announcement" >
              <p className="announcement-title">Title :{announcement.title}</p>
              <p className="announcement-description">Description :{announcement.description}</p>
              <p className="announcement-date"> Date : {announcement.createdAt}</p>
              <button onClick={() => handleDeleteAnnouncement(announcement._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No announcements to display</p>
      )}
      

    </div>
  );
};

export default Announcements;
*/
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
          setAnnouncements(Data.msg); // Set announcements state
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
                <p className="announcement-title">{index+1}. Title: {announcement.title}</p>
                <p className="announcement-description"
                 data-fulltext={announcement.description}
                 onClick={() => toggleDescription(index)}>
                   Description: {expandedDescription === index ? announcement.description : `${announcement.description.substring(0, 40)}...`}
                </p>
                <p className="announcement-date">Date: {announcement.createdAt}</p>
                <button className="announcement-deletebutton" onClick={() => handleDeleteAnnouncement(announcement._id)}><MdDelete size={24}/></button>
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
