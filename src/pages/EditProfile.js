import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import './EditProfile.css';

const EditProfile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: ''
    // Add other fields here as needed
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user data from the backend
      const response = await fetch('http://localhost:4000/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you're using JWT for authentication
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
      // Populate form data with fetched user data
      setFormData({
        name: data.name,
        age: data.age
        // Populate other fields similarly
      });
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated profile data to the backend
      const response = await fetch('http://localhost:4000/user/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      // Redirect the user to the profile page after successful update
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  return (
    <div className="edit-profile-page">
      <h1>Edit Profile</h1>
      {userData && (
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          {/* Add other form fields here */}
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;

