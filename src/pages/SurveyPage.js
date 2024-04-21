import React, { useState } from 'react';
import './SurveyPage.css'; 

const SurveyPage = () => {
  const [surveyData, setSurveyData] = useState({
    question: 'How satisfied are you with our services?',
    options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
    selectedOption: '',
    comments: ''
  });

  const handleOptionChange = (event) => {
    setSurveyData({ ...surveyData, selectedOption: event.target.value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Send survey data to backend or perform further actions
    console.log('Survey submitted:', surveyData);
    // Reset survey data
    setSurveyData({
      question: 'How satisfied are you with our services?',
      options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
      selectedOption: '',
      comments: ''
    });
  };

  return (
    <div className="SurveyPage">
      <h2>Survey</h2>
      <form onSubmit={handleSubmit}>
        <div className="question">{surveyData.question}</div>
        <div className="options">
          {surveyData.options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="radio"
                id={`option${index}`}
                value={option}
                checked={surveyData.selectedOption === option}
                onChange={handleOptionChange}
              />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default SurveyPage;
