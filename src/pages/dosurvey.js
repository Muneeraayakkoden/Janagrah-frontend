import React, { useState, useEffect } from 'react';

function DoSurvey() {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [polls, setPolls] = useState([]); // State to hold poll data

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
          body: JSON.stringify({ wardmemberid: wardmemberid, job: job }),
        });

        if (response.ok) {
          const { polls } = await response.json();
          console.log('Survey data:', polls);
          // Update the state with the received poll data
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
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add any submission logic here if needed
    setSubmitted(true);
  };

  return (
    <div className="container">
      {polls.map(poll => (
        <div key={poll._id}>
          <h1>Poll: {poll.surveyName}</h1>
          <p>Survey Description: {poll.surveyDescription}</p>
          <div className="options">
            {poll.options.map(option => (
              <div key={option._id} className="option">
                <input
                  type="radio"
                  id={option._id}
                  name="option"
                  value={option.text} // Display the text property of the option
                  checked={selectedOption === option.text}
                  onChange={handleOptionChange}
                />
                <label htmlFor={option._id}>{option.text}</label>
              </div>
            ))}
          </div>
          <button type="submit" disabled={submitted}>Submit</button>
          {submitted && <div className="result">Thank you for your vote!</div>}
        </div>
      ))}
    </div>
  );
}

export default DoSurvey;
