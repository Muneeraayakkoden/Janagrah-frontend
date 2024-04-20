import React from 'react';

function LoginRejected() {
  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Login Request Rejected</h2>
      <p style={paragraphStyle}>Sorry, Your request for login has been rejected by your ward member.</p>
      <p style={warningText}>Please contact your ward member for further information.</p>
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

const warningText = {
  color:'red'
}

const headingStyle = {
  color: '#3e65e2',
  fontSize: '24px',
  marginBottom: '15px',
};

const paragraphStyle = {
  color: '#333',
  fontSize: '18px',
};

export default LoginRejected;
