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
            wardid: wardid,
          }),
        });
        console.log(response);
        if (response.ok) {
          // Handle success
          const responseData = await response.json();
          console.log("All Residents:", responseData);

          console.log(responseData.data);
          setDetails(responseData.data); // Set residents state
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

  const filteredResidents = details.filter(resident =>
    resident.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <div key={index} className="resident-card">
              <div className="resident-details">
                <p className="resident-name">Name: {resident.username}</p>
                <p>Ward Member ID: {resident.wardmemberid}</p>
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
                <p>Password: {resident.password}</p>
                <p>Annual Income: {resident.annualIncome}</p>
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
