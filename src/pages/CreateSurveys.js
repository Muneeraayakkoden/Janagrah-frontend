import React, { useState } from 'react';
import './CreateSurveys.css'
const MAX_OPTIONS = 5; // Maximum allowed survey options

const CreateSurvey = () => {
  const [surveyNumber, setSurveyNumber] = useState('');
  const [surveyName, setSurveyName] = useState('');
  const [targetedSection, setTargetedSection] = useState('Everyone');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [options, setOptions] = useState([
    { id: 1, text: '' },
  ]); // Initial option with empty text

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement logic to submit survey data (e.g., sending data to a server)
    console.log('Survey data:', {
      surveyNumber,
      surveyName,
      surveyDescription,
      options,
    });
    // Reset form after submission (optional)
  };

  return (
    <div>
      <h1>Create Survey</h1>
      <form id="survey-form" onSubmit={handleSubmit}>
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
            <option value="student">Student</option>
            <option value="farmer">Farmer</option>
            <option value="teacher">Teacher</option>
            <option value="doctor">Doctor</option>
            <option value="housewife">Housewife</option>
            <option value="business">Business</option>
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
          <h2>Survey Options</h2>
          {options.map((option, index) => (
            <div className="option-group" key={option.id}>
              <label htmlFor={`option-${option.id}`}>Option {index + 1}:</label>
              <input
                type="text"
                id={`option-${option.id}`}
                name="options[]" // Include options[] for array submission
                value={option.text}
                onChange={(event) => handleOptionChange(option.id, event)}
                required
              />
              {index < MAX_OPTIONS - 1 && (
                <button type="button" className="add-option" onClick={handleAddOption}>
                  Add Option
                </button>
              )}
              {index > 0 && (
                <button type="button" className="remove-option" onClick={() => handleRemoveOption(option.id)}>
                  Remove
                  </button>
              )}
            </div>
          ))}
        </div>
        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
};
export default CreateSurvey;
