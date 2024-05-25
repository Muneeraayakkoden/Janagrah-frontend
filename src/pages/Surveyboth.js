
import React, { useState } from 'react';
import './Surveyboth.css';
import SurveyPage from './SurveyPage';
import CreateSurvey from './CreateSurveys';
import Officialside from '../components/Officialside';

function Surveys() {
  const [activeTab, setActiveTab] = useState('createSurvey'); // State to manage the active tab

  return (
    <div className="survey-page">
      <Officialside />
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'createSurvey' ? 'active' : ''}`}
          onClick={() => setActiveTab('createSurvey')}
        >
          Create Survey
        </div>
        <div
          className={`tab ${activeTab === 'surveysDone' ? 'active' : ''}`}
          onClick={() => setActiveTab('surveysDone')}
        >
          Surveys Done
        </div>
      </div>

      <div className="content">
        {activeTab === 'createSurvey' ? <CreateSurvey /> : <SurveyPage />}
      </div>
    </div>
  );
}

export default Surveys;
