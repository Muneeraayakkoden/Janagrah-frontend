import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Officialside from '../components/Officialside';
import './Results.css';

const Results = () => {
  const [surveyId, setSurveyId] = useState(null);
  const [surveyResults, setSurveyResults] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const surveyIdFromUrl = searchParams.get("surveyId");

    if (surveyIdFromUrl) {
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
        setSurveyResults(percentageResults);
      } else {
        console.error("Failed to fetch survey results");
      }
    } catch (error) {
      console.error("Error fetching survey results:", error);
    }
  };

  useEffect(() => {
    if (surveyId) {
      fetchSurveyResults();
    }
  }, [surveyId]);

  const getOptionWidth = (percentage) => {
    return `${percentage * 100}%`;
  };

  return (
    <div className="survey_result">
      <h3>Survey Result</h3>
      <Officialside />
      {surveyResults ? (
        <div className="polling-result-analysis">
          <p>Survey ID: {surveyId}</p>
          <p>Survey Results:</p>
          <div>
            {Object.entries(surveyResults).map(([option, percentage]) => (
              <div
                key={option}
                className="poll-item"
                title={`${option}: ${(percentage * 100).toFixed(2)}%`}
              >
                <div
                  className="poll-bar"
                  style={{
                    width: getOptionWidth(percentage),
                    backgroundColor: 'white',
                    color: 'black' // Ensure option name is in black color
                  }}
                >
                  <span className="option-text">{option}</span>
                </div>
                {percentage === 0 ? (
                  <div
                    className="poll-bar"
                    style={{
                      width: "100%",
                      backgroundColor: "#333",
                      color: 'white',
                      paddingLeft: getOptionWidth(percentage) // Shift the text to align with the white bar
                    }}
                  >
                    <span className="option-text">{option}</span>
                  </div>
                ) : null}
                <div className="percentage-text">
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
