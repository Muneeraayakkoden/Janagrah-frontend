import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Results = () => {
  const [surveyId, setSurveyId] = useState(null); // State to store the surveyId
  const [surveyResults, setSurveyResults] = useState(null); // State to store survey result data
  const location = useLocation(); // Initialize useLocation

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const surveyIdFromUrl = searchParams.get("surveyId");

    if (surveyIdFromUrl) {
      // Update the surveyId state with the value from the URL query parameter
      setSurveyId(surveyIdFromUrl);
    } else {
      console.error("No survey ID found in the URL");
    }
  }, [location]);

  const fetchSurveyResults = async () => {
    try {
      const response = await fetch("http://localhost:4000/poll/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ surveyId }),
      });

      if (response.ok) {
        const data = await response.json();
        setSurveyResults(data.optionCounts); // Set the survey result data received from the backend
      } else {
        console.error("Failed to fetch survey results");
      }
    } catch (error) {
      console.error("Error fetching survey results:", error);
    }
  };

  useEffect(() => {
    if (surveyId) {
      // Call the function to fetch survey results from the backend
      fetchSurveyResults();
    }
  }, [surveyId]);

  return (
    <div>
      <h3>Survey History</h3>
      {surveyResults ? (
        <div>
          <p>Survey ID: {surveyId}</p>
          <p>Survey Results:</p>
          <ul>
            {Object.entries(surveyResults).map(([option, count]) => (
              <li key={option}>
                Option: {option}, Count: {count}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading survey results...</p>
      )}
    </div>
  );
};

export default Results;
