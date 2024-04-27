import React, { useState } from "react";
import './CreateAnnouncement.css';
import { useNavigate } from 'react-router-dom';

function CreateAnnouncement() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        uploadEvent: null,
    });
    const [announcementSent, setAnnouncementSent] = useState(false);
    const [error, setError] = useState(null); // New state for handling errors
   
    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: id.startsWith("upload") ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!formData.title || !formData.description) {
            setError("Please fill in all required fields.");
            return;
        }
        
        try {
            const response = await fetch("http://localhost:4000/announcement/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                setAnnouncementSent(true);
                setFormData({
                    title: "",
                    description: "",
                    uploadEvent: null,
                });
                setError(null); // Clear any previous errors
            } else {
                setError("Failed to create announcement");
                setAnnouncementSent(false);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("Error submitting form. Please try again later.");
            setAnnouncementSent(false);
        }
    };

    return (
        <div>
            <div className="create-updates-container">
                <h1>Create Event</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Announcement Title:</label>
                    <input type="text" id="title" required value={formData.title} onChange={handleChange} />
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" required value={formData.description} onChange={handleChange}></textarea>
                    <div className="upload-options">
                        <label htmlFor="upload-event">Upload Event (optional):</label>
                        <input type="file" id="upload-event" accept=".jpg,.jpeg,.png" onChange={handleChange} />
                    </div>
                    {error && <p className="error-message">{error}</p>} {/* Display error message */}
                    <button type="submit" className="publish-button">Publish</button>
                    {announcementSent && <p className="success-message">Announcement sent successfully!</p>}
                </form>
            </div>
            <div className="history-button-container">
                <button type="button" className="history-button" onClick={() => {navigate('/AnnouncedHistory')}}>Announced Events</button>
            </div>
        </div> 
    );
}

export default CreateAnnouncement;
