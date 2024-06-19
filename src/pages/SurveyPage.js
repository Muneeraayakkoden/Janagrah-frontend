import React, { useState, useEffect } from 'react';
import './SurveyPage.css'; 
import { useNavigate } from 'react-router-dom';

const SurveyPage = () => {
  const [surveyDataList, setSurveyDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const username = JSON.parse(localStorage.getItem('username'));

        const response = await fetch('http://localhost:4000/poll/showpoll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Survey data:', data);
          
          // Sort the surveys by createdAt
          const sortedSurveys = data.polls.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          
          setSurveyDataList(sortedSurveys);
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
      console.log('Stop polling for survey ID:', surveyId);

      const data = { surveyId };

      const response = await fetch('http://localhost:4000/poll/stopPolling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Polling stopped successfully');
        // Update survey status to false after stopping polling
        setSurveyDataList(prevData =>
          prevData.map(survey =>
            survey._id === surveyId ? { ...survey, currentstatus: false } : survey
          )
        );
      } else {
        console.error('Failed to stop polling');
      }
    } catch (error) {
      console.error('Error stopping polling:', error);
    }
  };

  const handleResult = (surveyId) => {
    console.log('View result for survey ID:', surveyId);
    navigate(`/Results?surveyId=${surveyId}`);
  };

  return (
    <div className='surveypage'>
      {surveyDataList.length > 0 ? (
        <div>
          <h2>Survey Data</h2>
          <div className='survey1'>
            {surveyDataList.map((survey, index) => (
              <div className='survey2' key={index}>
                <p className="survey_no">{index +1}.  SURVEY NO: {survey.surveyNumber}</p>
                Survey Name: {survey.surveyName}<br />
                Targeted Section: {survey.targetedSection}<br />
                Survey Description: {survey.surveyDescription}<br />
                Options:
                <ul>
                  {survey.options.map((option, optIndex) => (
                    <li key={optIndex}>Option {optIndex + 1}: {option.text}</li>
                  ))}
                </ul>
                <div className='survey-button'> 
                  {survey.currentstatus ? (
                    <button className='stop_poll' onClick={() => handleStopPolling(survey._id)}>Stop Polling</button>
                  ) : (
                    <p className="stopped">Poll stopped</p>
                  )}
                  <button className="poll_result" onClick={() => handleResult(survey._id)}>Result</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No survey data available</p>
      )}
    </div>
  );
};

export default SurveyPage;
