import React, { useState } from 'react';
import './CreateSurveys.css';

const MAX_OPTIONS = 5;

const CreateSurvey = () => {
  const [surveyNumber, setSurveyNumber] = useState('');
  const [surveyName, setSurveyName] = useState('');
  const [targetedSection, setTargetedSection] = useState('Everyone');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [options, setOptions] = useState([{ id: 1, text: '' }]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSurveyNumberChange = (event) => {
    setSurveyNumber(event.target.value);
  };

  const handleSurveyNameChange = (event) => {
    setSurveyName(event.target.value);
  };

  const handleTargetedSectionChange = (event) => {
    setTargetedSection(event.target.value);
  };

  const handleSurveyDescriptionChange = (event) => {
    setSurveyDescription(event.target.value);
  };

  const handleAddOption = () => {
    if (options.length < MAX_OPTIONS) {
      setOptions([...options, { id: options.length + 1, text: '' }]);
    } else {
      alert('Maximum of 5 options allowed!');
    }
  };

  const handleRemoveOption = (id) => {
    setOptions(options.filter((option) => option.id !== id));
  };

  const handleOptionChange = (id, event) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, text: event.target.value } : option
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = JSON.parse(localStorage.getItem('username'));

    const formData = {
      surveyNumber,
      surveyName,
      targetedSection,
      surveyDescription,
      options: options.map(option => option.text),
      username: username // Use the parsed username
    };
  
    console.log("formdata",formData);

    try {
      const response = await fetch('http://localhost:4000/poll/createpoll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create survey');
      }

      const responseData = await response.json();
      setSuccessMessage(responseData.message);
      setSurveyNumber('');
      setSurveyName('');
      setTargetedSection('Everyone');
      setSurveyDescription('');
      setOptions([{ id: 1, text: '' }]);
    } catch (error) {
      console.error('Error creating survey:', error);
    }
  };

  return (
    <div className="create-survey-container">
      <form className="survey-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="survey-number">Survey Number:</label>
          <input
            type="text"
            id="survey-number"
            name="surveyNumber"
            value={surveyNumber}
            onChange={handleSurveyNumberChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="survey-name">Survey Name/Title:</label>
          <input
            type="text"
            id="survey-name"
            name="surveyName"
            value={surveyName}
            onChange={handleSurveyNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="targeted-section">Targeted Section:</label>
          <select
            id="targeted-section"
            name="targetedSection"
            value={targetedSection}
            onChange={handleTargetedSectionChange}
          >
            <option value="Everyone">Everyone</option>
            <option value="Student">Student</option>
            <option value="Farmer">Farmer</option>
            <option value="Teacher">Teacher</option>
            <option value="Doctor">Doctor</option>
            <option value="Housewife">Housewife</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="survey-description">Survey Description:</label>
          <textarea
            id="survey-description"
            name="surveyDescription"
            rows="5"
            value={surveyDescription}
            onChange={handleSurveyDescriptionChange}
            required
          />
        </div>
        <div className="survey-options">
          <h5>Survey Options</h5>
          {options.map((option, index) => (
            <div className="option-group" key={option.id}>
              <label htmlFor={`option-${option.id}`}>Option {index + 1}:</label>
              <input
                type="text"
                id={`option-${option.id}`}
                name="options[]"
                value={option.text}
                onChange={(event) => handleOptionChange(option.id, event)}
                required
              />
              {index < MAX_OPTIONS - 1 && (
                <button type="button" className="add-option" onClick={handleAddOption}>
                  Add Option
                </button>
              )}
              {index === options.length - 1 && (
                <button type="button" className="remove-option" onClick={() => handleRemoveOption(option.id)}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="submit" className="create-survey-button">Create Survey</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default CreateSurvey;
