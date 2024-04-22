import React, { useState } from "react";
import './CreateUpdates.css';

function CreateUpdates() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        uploadEvent: null,
    });

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: id.startsWith("upload") ? files[0] : value
        }));
    };

    const [announcementSent, setAnnouncementSent] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(JSON.stringify(formData));
            const wardid = JSON.parse(localStorage.getItem('username'));
            console.log(wardid)
             // Check if all required data is available
            if ( wardid) {
                //yformDataToSend.append("uploadEvent", formData.uploadEvent);
                console.log(formData);
                const response = await fetch("http://localhost:4000/announcement/create", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        wardid:wardid,
                        title:formData.title,
                        description:formData.description
                      }),
                });
                console.log(response);
                if (response.ok) {
                    // Handle success
                    const responseData = await response.json();
                    console.log("Response Data:", responseData); // Log response data
                
                    setAnnouncementSent(true);
                } else {
                    // Handle error
                    console.log("Failed to create announcement");
                // setAnnouncementSent(false);
                 }
            } else {
            console.error("Required data from local storage is missing.");
            }
        }catch{

            console.log("Error submitting form:");
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
                {announcementSent && <p>Announcement sent successfully!</p>} {/* Display success message if announcementSent state is true */}
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