import React, { useState } from "react";
import './CreateUpdates.css';

function CreateUpdates() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        uploadEvent: null,
        uploadService: null
    });

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: id.startsWith("upload") ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("uploadEvent", formData.uploadEvent);
            formDataToSend.append("uploadService", formData.uploadService);

            const response = await fetch("http://localhost:4000/announcement/create", {
                method: "POST",
                body: formDataToSend
            });
            if (response.ok) {
                // Handle success
            } else {
                // Handle error
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div>
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
                <button type="submit">Publish</button>
            </form>
        </div>
    );
}

export default CreateUpdates;








/*import React from "react";
import './CreateUpdates.css';

function CreateUpdates() {
    return (
        
        <form action="#">
        <label htmlFor="title">Announcement Title:</label>
        <input type="text" id="title" required />
        <label htmlFor="description">Description:</label>
        <textarea id="description" required></textarea>
        <div className="upload-options">
            <label htmlFor="upload-event">Upload Event (optional):</label>
            <input type="file" id="upload-event" accept=".jpg,.jpeg,.png" />
            <label htmlFor="upload-service">Upload Service (optional):</label>
            <input type="file" id="upload-service" accept=".jpg,.jpeg,.png" />
        </div>
        <button type="submit">Publish</button>
    </form>

    //<h1>this is announcement page</h1>
    );
  }

  export  default CreateUpdates;*/