import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  
  /*useEffect(() => {
    fetchAnnouncements();
  }, []);*/
  useEffect(() => {
    const wardid = JSON.parse(localStorage.getItem('username'));
    console.log(wardid);
    if (wardid) {
      fetchAnnouncements();
    } else {
      console.error("Required data 'wardId' from local storage is missing.");
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
                  let responseData = await response.json();
                  console.log("All announcement:", responseData);
                  if (!Array.isArray(responseData)) {
                        responseData = [responseData];
                  }
              
                  setAnnouncements(responseData); // Set announcements state
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
  };*/

  return (

    <div>
      <h1>Announcements</h1>
      {announcements.length > 0 ? (
       
        <ul>
          {announcements.map((announcement,index) => (
            <li key={index}>
              <h3>Title:{announcement.title}</h3>
              <p>Description{announcement.description}</p>
              <p>Created Date: {announcement.createdDate}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No announcements to display</p>
      )}
      
      <Link to="/CreateUpdates">
        <button>Create Announcement</button>
      </Link>
    </div>
  );
};

export default Announcement;

