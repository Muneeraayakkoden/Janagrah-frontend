import React, { useState, useEffect } from 'react';
import './AllResidents.css'; // Import the CSS file

const AllResidents = () => {
  const [details, setDetails] = useState([]);

  const wardid = JSON.parse(localStorage.getItem('username'));
  console.log(wardid);


  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
        if ( wardid) {
          const response = await fetch("http://localhost:4000/user/details", {
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
              console.log("All Residents:",Data);

              console.log(Data.users);
              setDetails(Data.users); // Set announcements state
          } else {
              console.error("Failed to fetch details");
            }   
        } else{ 
         console.error("Requird data from local storage is missing.");
        }
    }catch(error){
        console.error("Error in try catch block",error.message);
    }
  };

  return (
    <div className="all-residents-container">
      <h1>ALL RESIDENTS</h1>
      <p className="user-count">Total Users: {details.length}</p>
      {details.length > 0 ? (
        <div>
          {details.map((user, index) => (
            <div key={index} className="resident-card"> 
                
              <div className="resident-details">
                <p className="resident-name">Name: {user.name}</p>
                <p>State: {user.state}</p>
                <p>District: {user.district}</p>
                <p>Local Authority: {user.localAuthority}</p>
                <p>Ward: {user.ward}</p>
                <p>Voter ID: {user.voterId}</p>
                <p>Age: {user.age}</p>
                <p className="resident-phone">Phone: {user.phone}</p>
                <p>Job: {user.job}</p>
                <p className="resident-address">Address: {user.address}</p> 
                <p className="resident-email">Email: {user.email}</p> 
                <p>Username: {user.username}</p>
                <p>Password: {user.password}</p>
                <p>Annual Income: {user.annualIncome}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No residents to display</p>
      )}
    </div>
  );
};

export default AllResidents;
