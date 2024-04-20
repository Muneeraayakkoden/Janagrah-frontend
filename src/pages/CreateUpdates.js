import React from "react";
import './CreateUpdates.css';

function CreateUpdates() {
    return (
        <form action="#">
        <label htmlFor="title">Update Title:</label>
        <input type="text" id="title" required />
        <label htmlFor="description">Update Description:</label>
        <textarea id="description" required></textarea>
        <div className="upload-options">
            <label htmlFor="upload-event">Upload Event (optional):</label>
            <input type="file" id="upload-event" accept=".jpg,.jpeg,.png" />
            <label htmlFor="upload-service">Upload Service (optional):</label>
            <input type="file" id="upload-service" accept=".jpg,.jpeg,.png" />
        </div>
        <button type="submit">Publish Update</button>
    </form>
    );
  }

  export  default CreateUpdates;