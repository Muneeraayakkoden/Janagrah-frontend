import React, { useState, useEffect } from 'react';
import './doSurvey.css';
import Navbar from '../components/Navbar';

function DoSurvey() {
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [submittedPolls, setSubmittedPolls] = useState([]);
  const [polls, setPolls] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const wardmemberid = JSON.parse(localStorage.getItem('wardmemberid'));
        const job = JSON.parse(localStorage.getItem('job'));
        const username = JSON.parse(localStorage.getItem('username'));

        const response = await fetch('http://localhost:4000/poll/dosurvey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ wardmemberid, job, username }),
        });

        if (response.ok) {
          const { polls } = await response.json();
          console.log('Survey data:', polls);

          // Sort the polls by createdAt in descending order
          const sortedPolls = polls.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPolls(sortedPolls);
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
          setSubmittedPolls([...submittedPolls, surveyId]);
        } else {
          const data = await response.json();
          console.error('Failed to submit data:', data.message);
          setErrorMessages({ ...errorMessages, [pollIndex]: data.message });
        }
      } else {
        console.error('Invalid surveyId');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="SurveyContainer">
      <Navbar />
      <h3>{polls.length === 0 ? 'No surveys available' : 'AVAILABLE SURVEYS'}</h3>
      {polls.length > 0 && (
        <div className="polls-container">
          {polls.map((poll, index) => (
            <div className="poll" key={poll._id}>
              <h1 className='heading'><u>{index + 1}: {poll.surveyName}</u></h1>
              <h5>Description: {poll.surveyDescription}</h5>
              <div className="options">
                {poll.options.map((option) => (
                  <div key={option._id} className="option">
                    <input
                      type="radio"
                      id={option._id}
                      name={`option-${poll._id}`}
                      value={option.text}
                      checked={selectedOptionId === option._id}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor={option._id}>{option.text}</label>
                  </div>
                ))}
              </div>
              <button
                className="doSurveybutton"
                type="button"
                disabled={submittedPolls.includes(poll._id)}
                onClick={() => handleSubmit(poll._id, index)}
              >
                <i className="fas fa-paper-plane"></i> Submit
              </button>
              {submittedPolls.includes(poll._id) && <div className="result">Thank you for your vote!</div>}
              {errorMessages[index] && <div className="error">{errorMessages[index]}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoSurvey;

