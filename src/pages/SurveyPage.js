import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const SurveyPage = () => {
  const [surveyDataList, setSurveyDataList] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const username = JSON.parse(localStorage.getItem('username'));

        const response = await fetch('http://localhost:4000/poll/showpoll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Survey data:', data);
          setSurveyDataList(data.polls);
        } else {
          console.error('Failed to fetch survey data');
        }
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };

    fetchSurveyData();
  }, []);

  const handleStopPolling = async (surveyId) => {
    try {
      // Implement stop polling logic here
      console.log('Stop polling for survey ID:', surveyId);
  
      // Prepare the data to send in the POST request body
      const data = { surveyId };
  
      // Send the POST request to the backend endpoint
      const response = await fetch('http://localhost:4000/poll/stopPolling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      // Check if the request was successful
      if (response.ok) {
        console.log('Polling stopped successfully');
        // Perform any additional actions after stopping polling
      } else {
        console.error('Failed to stop polling');
      }
    } catch (error) {
      console.error('Error stopping polling:', error);
    }
  };
  

  const handleResult = (surveyId) => {
    // Navigate to the result page with the survey ID as a query parameter
    console.log('View result for survey ID:', surveyId);
    navigate(`/Results?surveyId=${surveyId}`); // Navigate to '/Results' with surveyId as query parameter
  };
  

  return (
    <div>
      {/* Render survey data here */}
      {surveyDataList.length > 0 ? (
        <div>
          <h2>Survey Data</h2>
          <ul>
            {surveyDataList.map((survey, index) => (
              <li key={index}>
                Survey Number: {survey.surveyNumber}<br />
                Survey Name: {survey.surveyName}<br />
                Targeted Section: {survey.targetedSection}<br />
                Survey Description: {survey.surveyDescription}<br />
                Options:
                <ul>
                  {survey.options.map((option, optIndex) => (
                    <li key={optIndex}>Option {optIndex + 1}: {option.text}</li>
                  ))}
                </ul>
                <button onClick={() => handleStopPolling(survey._id)}>Stop Polling</button>
                <button onClick={() => handleResult(survey._id)}>Result</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No survey data available</p>
      )}
    </div>
  );
};

export default SurveyPage;
