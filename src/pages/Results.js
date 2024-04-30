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
        console.log("data", data);
        const totalCount = Object.values(data.optionCounts).reduce(
          (acc, count) => acc + count,
          0
        );
        const percentageResults = Object.fromEntries(
          Object.entries(data.optionCounts).map(([option, count]) => [
            option,
            count / totalCount,
          ])
        );
        setSurveyResults(percentageResults); // Set the survey result data received from the backend
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

  const getOptionDisplay = (percentage) => {
    if (percentage < 0.05) {
      return "15%"; // Set a fixed width for very low percentages
    } else {
      return `${percentage * 100}%`; // Set the percentage width for other options
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 0.7) {
      return "green";
    } else if (percentage >= 0.3 && percentage < 0.7) {
      return "yellow";
    } else {
      return "red";
    }
  };

  return (
    <div>
      <h3>Survey History</h3>
      {surveyResults ? (
        <div>
          <p>Survey ID: {surveyId}</p>
          <p>Survey Results:</p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {Object.entries(surveyResults).map(([option, percentage]) => (
              <div
                key={option}
                style={{
                  backgroundColor: getPercentageColor(percentage),
                  width: getOptionDisplay(percentage),
                  height: "150px", // Increase height here
                  padding: "10px",
                  margin: "5px",
                  border: "1px solid #000",
                  borderRadius: "15px", // Rounded corners
                  fontFamily: "Arial, sans-serif", // Font family
                  fontSize: "16px", // Increase font size
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  position: "relative", // Position the percentage text
                }}
                title={`${option}: ${(percentage * 100).toFixed(2)}%`}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "30px", // Increase font size for option text
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {option}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                    fontSize: "30px", // Increase font size for percentage text
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {(percentage * 100).toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading survey results...</p>
      )}
    </div>
  );
};

export default Results;
