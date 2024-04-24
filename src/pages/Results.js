import React, { useState, useEffect } from 'react';
import './Results.css'; // Import CSS file for styling

const Results = () => {
  const [pollData, setPollData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPollData();
  }, []);

  const fetchPollData = async () => {
    try {
      // Fetch poll data from the backend
      const response = await fetch('http://localhost:4000/poll/results');
      if (response.ok) {
        const data = await response.json();
        setPollData(data.pollResults);
      } else {
        console.error('Failed to fetch polling data');
      }
    } catch (error) {
      console.error('Error fetching polling data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="polling-result-analysis">
      <h2>Polling Result Analysis</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {pollData.map((pollItem, index) => (
            <div key={index} className="poll-item">
              <h3>{pollItem.question}</h3>
              <ul>
                {pollItem.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <span>{option.text}</span>
                    <span>{option.votes} Votes</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
