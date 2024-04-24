import React, { useState } from 'react';

function DoSurvey() {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [option1Count, setOption1Count] = useState(0); // State to hold count for Option 1
  const [option2Count, setOption2Count] = useState(0); // State to hold count for Option 2

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Simulate sending the selected option to the server
    console.log(`Option selected: ${selectedOption}`);
    if (selectedOption === 'Option 1') {
      setOption1Count(option1Count + 1);
    } else if (selectedOption === 'Option 2') {
      setOption2Count(option2Count + 1);
    }
    setSubmitted(true);
  };

  return (
    <div className="container">
      <h1>Poll: Survey Name</h1>
      <p>Survey Description: gg</p>
      <form onSubmit={handleSubmit}>
        <div className="options">
          <div className="option">
            <input
              type="radio"
              id="option1"
              name="option"
              value="Option 1"
              checked={selectedOption === 'Option 1'}
              onChange={handleOptionChange}
            />
            <label htmlFor="option1">Option 1</label>
          </div>
          <div className="option">
            <input
              type="radio"
              id="option2"
              name="option"
              value="Option 2"
              checked={selectedOption === 'Option 2'}
              onChange={handleOptionChange}
            />
            <label htmlFor="option2">Option 2</label>
          </div>
        </div>
        <button type="submit">
          {submitted ? `Option 1: ${option1Count}, Option 2: ${option2Count}` : 'Submit'}
        </button>
      </form>
      {submitted && <div className="result">Thank you for your vote!</div>}
    </div>
  );
}

export default DoSurvey;
