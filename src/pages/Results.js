import React, { useState, useEffect } from "react";
import {  useLocation } from "react-router-dom";

const Results = () => {
  const [surveyId, setSurveyId] = useState(null); // State to store the surveyId
 // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const surveyIdFromUrl = searchParams.get("surveyId");
    console.log(surveyIdFromUrl)

    if (surveyIdFromUrl) {
      // Update the surveyId state with the value from the URL query parameter
      setSurveyId(surveyIdFromUrl);
    } else {
      console.error("No survey ID found in the URL");
    }
  }, [location]); // Add location as a dependency to the useEffect hook

  const sendSurveyIdToBackend = async () => {
    try {
      const response = await fetch("http://localhost:4000/poll/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ surveyId }),
      });

      if (response.ok) {
        console.log("Survey ID sent to backend successfully");
        // Handle any further actions after sending the surveyId to the backend
      } else {
        console.error("Failed to send survey ID to backend");
      }
    } catch (error) {
      console.error("Error sending survey ID to backend:", error);
    }
  };

  useEffect(() => {
    if (surveyId) {
      // Call the function to send the surveyId to the backend
      sendSurveyIdToBackend();
    }
  }, [surveyId]); // Add surveyId as a dependency to this useEffect hook

  return (
    <div>
      <h3>Survey History</h3>
    </div>
  );
};

export default Results;
