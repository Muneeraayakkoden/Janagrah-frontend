
import React from 'react';

function ResidentSignupSuccess() {
  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Registration Successful!</h2>
      <p style={paragraphStyle}>Your account has been created successfully. It will be verified by the official manually. Please wait for approval.</p>
    </div>
  );
}

const containerStyle = {
  backgroundColor: '#f0f0f0',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '500px',
  margin: 'auto',
  marginTop: '50px',
};

const headingStyle = {
  color: '#3e65e2',
  fontSize: '24px',
  marginBottom: '15px',
};

const paragraphStyle = {
  color: '#333',
  fontSize: '18px',
};

export default ResidentSignupSuccess;
