import React, { useState, useEffect } from 'react';
import './SurveyPage.css'; 
import Card from '../components/Card';

const SurveyPage = () => {
  const [availableSurveys, setAvailableSurveys] = useState([]);
  const [completedSurveys, setCompletedSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null); // Track selected survey for feedback

  // Fetch surveys from backend (replace with your actual API call)
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch('/api/surveys');
        const data = await response.json();
        setAvailableSurveys(data.availableSurveys);
        setCompletedSurveys(data.completedSurveys);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };
    fetchSurveys();
  }, []);

  const handleSurveyClick = (survey) => {
    setSelectedSurvey(survey);
  };

  const handleSurveySubmit = (feedback) => {
    // Send survey response and feedback to backend (replace with your logic)
    console.log('Survey submitted:', { survey: selectedSurvey, feedback });
    setSelectedSurvey(null); // Clear selected survey after submission
  };

  return (
    <div className="SurveyPage">
      <div className="survey-sections">
        <h2>Available Surveys</h2>
        {availableSurveys.length > 0 ? (
          <div className="survey-list">
            {availableSurveys.map((survey) => (
              <div key={survey.id} className="survey-item">
                <button onClick={() => handleSurveyClick(survey)}>
                  <h3>{survey.name}</h3>
                  <p>{survey.description}</p>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-surveys">Surveys not available.</p>
        )}

        {selectedSurvey && (
          <div className="selected-survey">
            <h2>{selectedSurvey.name}</h2>
            <p>{selectedSurvey.description}</p>
            {/* Display survey questions here (replace with your logic) */}
            <SurveyForm survey={selectedSurvey} onSubmit={handleSurveySubmit} /> {/* Replace with your SurveyForm component */}
          </div>
        )}
      </div>
      <div className="completed-surveys">
        <h2>Completed Surveys</h2>
        {completedSurveys.length > 0 ? (
          <div className="completed-surveys-list">
            {completedSurveys.map((survey) => (
              <Card
                key={survey.id}
                title={survey.name}
                description={survey.description}
                // Add date of attempt as props if available
              />
            ))}
          </div>
        ) : (
          <p className="no-surveys">No surveys attempted.</p>
        )}
      </div>
    </div>
  );
};

const SurveyForm = ({ survey, onSubmit }) => {
  // Survey form logic here (including feedback question)
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(feedback); // Pass feedback to SurveyPage submit handler
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Display survey questions based on survey.questions (replace with your logic) */}
      <div className="feedback-question">
        <label htmlFor="feedback">How satisfied are you with our services?</label>
        <select id="feedback" name="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)}>
          <option value="Very Satisfied">Very Satisfied</option>
          <option value="Satisfied">Satisfied</option>
          <option value="Neutral">Neutral</option>
          <option value="Dissatisfied">Dissatisfied</option>
          <option value="Very Dissatisfied">Very Dissatisfied</option>
        </select>
      </div>
      <button type="submit">Submit Survey</button>
    </form>
  );
};

export default SurveyPage;
