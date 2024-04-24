import React, { useState, useEffect } from 'react';

const SurveysCompleted = () => {
    //const [userData, setUserData] = useState(null);
    const [surveysCompleted, setSurveysCompleted] = useState([]);

    useEffect(() => {
      // Fetch user data and surveys completed when the component mounts
      //fetchUserData();
      fetchSurveysCompleted();
    }, []);


  const fetchSurveysCompleted = async () => {
    try {
      // Fetch surveys completed by the user from the backend
      // Adjust the endpoint URL and headers as needed
      const response = await fetch('http://localhost:4000/user/surveys', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch surveys completed');
      }
      const data = await response.json();
      setSurveysCompleted(data);
    } catch (error) {
      console.error('Error fetching surveys completed:', error.message);
    }
  };
  return(
    <div className="surveys-completed">
        <h2>Surveys Completed</h2>
        <ul>
            {surveysCompleted.map((survey, index) => (
                <li key={index}>{survey.title} - Completed on: {survey.completionDate}</li>
            ))}
        </ul>
    </div>
  );
}

export default SurveysCompleted;