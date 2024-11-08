import React, { useState } from "react";
import './CreateAnnouncement.css';
import Officialside from '../components/Officialside.js';

function CreateAnnouncement() {
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
    const [updates, setUpdates] = useState([]);

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
                    setUpdates(prevUpdates => [...prevUpdates, responseData]);
                    setFormData({
                        title: "",
                        description: "",
                        uploadEvent: null,
                    });
                    setAnnouncementSent(true);
                } else {
                    // Handle error
                    console.log("Failed to create announcement");
                    setAnnouncementSent(false);
                 }
            } else {
            console.error("Required data from local storage is missing.");
            }
        }catch(error){
            console.log("Error submitting form:",error);
            setAnnouncementSent(false);
        }
    };

    const handleClearHistory = () => {
        setUpdates([]);
    };

    return (
        <div>
            <div className="create-updates-container">
            <Officialside />
            <h1>ANNOUNCE AN EVENT</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <fieldset>
                    <legend>Title</legend>
                    <input
                        type="text"
                        id="title"
                        required
                        value={formData.title}
                        placeholder=" "
                        onChange={handleChange}
                    />
                    </fieldset>
                </div>

                <div className="input-container">
                    <fieldset>
                    <legend>Description</legend>
                    <textarea
                        id="description"
                        required
                        value={formData.description}
                        placeholder=" "
                        onChange={handleChange}
                    ></textarea>
                    </fieldset>
                </div>

                <div className="upload-options">
                    <label htmlFor="upload-event">Upload Event (optional): </label>
                    <input type="file" id="upload-event" accept=".jpg,.jpeg,.png" onChange={handleChange} />
                </div>
                <button type="submit" className="publish-button">Publish</button>
                {announcementSent && <p className="success-message">Announcement sent successfully!</p>}
            </form>
            </div>
        </div> 
    );
}

export default CreateAnnouncement;

                    