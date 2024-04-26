import React, { useState, useEffect } from 'react';

function DoSurvey() {
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [polls, setPolls] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const wardmemberid = JSON.parse(localStorage.getItem('wardmemberid'));
        const job = JSON.parse(localStorage.getItem('job'));

        const response = await fetch('http://localhost:4000/poll/dosurvey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ wardmemberid, job }),
        });

        if (response.ok) {
          const { polls } = await response.json();
          console.log('Survey data:', polls);
          setPolls(polls);
        } else {
          console.error('Failed to fetch survey data');
        }
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };

    fetchSurveyData();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOptionId(event.target.id);
  };

  const handleSubmit = async (surveyId, pollIndex) => {
    try {
      console.log('Survey ID:', surveyId);
      console.log('Selected Option ID:', selectedOptionId);
      const username = JSON.parse(localStorage.getItem('username'));

      if (surveyId !== null) {
        const response = await fetch('http://localhost:4000/poll/addresult', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ surveyId, selectedOptionId, username }),
        });

        if (response.ok) {
          console.log('Submission successful');
          setSubmitted(true);
        } else {
          const data = await response.json();
          console.error('Failed to submit data:', data.message);
          setErrorMessages({ ...errorMessages, [pollIndex]: data.message }); // Store the error message for the poll
        }
      } else {
        console.error('Invalid surveyId');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="container">
      {polls.map((poll, index) => (
        <div key={poll._id}>
          <h1>Poll: {poll.surveyName}</h1>
          <p>Survey Description: {poll.surveyDescription}</p>
          <div className="options">
            {poll.options.map((option) => (
              <div key={option._id} className="option">
                <input
                  type="radio"
                  id={option._id}
                  name="option"
                  value={option.text}
                  checked={selectedOptionId === option._id}
                  onChange={handleOptionChange}
                />
                <label htmlFor={option._id}>{option.text}</label>
              </div>
            ))}
          </div>
          <button
            type="button"
            disabled={submitted}
            onClick={() => handleSubmit(poll._id, index)} // Pass pollIndex to handleSubmit
          >
            Submit
          </button>
          {submitted && <div className="result">Thank you for your vote!</div>}
          {errorMessages[index] && <div className="error">{errorMessages[index]}</div>} {/* Render error message if exists for this poll */}
        </div>
      ))}
    </div>
  );
}

export default DoSurvey;
