import React, { useState, useEffect } from 'react';
import './AllResidents.css'; // Import the CSS file

const AllResidents = () => {
  const [details, setDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const wardid = JSON.parse(localStorage.getItem('username'));
  console.log(wardid);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      if (wardid) {
        const response = await fetch('http://localhost:4000/login/viewUser', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            wardmemberid: wardid,
          }),
        });
        console.log(response);
        if (response.ok) {
          // Handle success
          const responseData = await response.json();
          console.log("All Residents:", responseData);

          if (responseData.success) {
            console.log(responseData.data);
            setDetails(responseData.data); // Set residents state
          } else {
            console.log(responseData.message);
          }
        } else {
          console.error("Failed to fetch details");
        }
      } else {
        console.error("Required data from local storage is missing.");
      }
    } catch (error) {
      console.error("Error in try catch block", error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (residentId) => {
    try {
      const response = await fetch('http://localhost:4000/user/delete', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          residentId: residentId,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          // Remove the deleted resident from the state
          setDetails(details.filter(resident => resident._id !== residentId));
        } else {
          console.log(responseData.message);
        }
      } else {
        console.error("Failed to delete resident");
      }
    } catch (error) {
      console.error("Error deleting resident:", error.message);
    }
  };

  const filteredResidents = details ? details.filter(resident =>
    resident.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="all-residents-container">
      <h1>ALL RESIDENTS</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <p className="user-count">Total Users: {filteredResidents.length}</p>
      {filteredResidents.length > 0 ? (
        <div>
          {filteredResidents.map((resident, index) => (
            <div key={resident._id} className="resident-card">
              <div className="resident-image-container">
                <img className="resident-image" src={`data:image/jpeg;base64,${resident.image}`} alt="Resident" />
              </div>
              <div className="resident-details">
                <p className="resident-name">Name: {resident.name}</p>
                <p>Username: {resident.username}</p>
                <p>State: {resident.state}</p>
                <p>District: {resident.district}</p>
                <p>Local Authority: {resident.localAuthority}</p>
                <p>Ward: {resident.ward}</p>
                <p>Voter ID: {resident.voterId}</p>
                <p>Age: {resident.age}</p>
                <p className="resident-phone">Phone: {resident.phone}</p>
                <p>Job: {resident.job}</p>
                <p className="resident-address">Address: {resident.address}</p>
                <p className="resident-email">Email: {resident.email}</p>
                <p>Annual Income: {resident.annualIncome}</p>
                <button  onClick={() => handleDelete(resident._id)}>Delete</button>
                
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
