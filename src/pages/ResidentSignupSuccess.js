import React from 'react';
import { useNavigate } from 'react-router-dom';

function ResidentSignupSuccess() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <div className="regbg">
      <div className="reject flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
        <div className="container max-w-md space-y-4 py-5 text-center ">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Registration Successful!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for registering. You will receive an email after verification by your ward member.
          </p>
          <p>Please wait for approval.</p>
          <button
            onClick={handleLoginRedirect}
            className="mt-4 px-6 py-2 text-white bg-black rounded transform transition-transform duration-300 hover:scale-105 focus:outline-none"
          >
            Go to Login Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResidentSignupSuccess;
