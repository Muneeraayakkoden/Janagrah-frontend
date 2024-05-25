import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRejected.css';

function LoginRejected() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/ResidentSignup');
  };


  return (
    <div className=" reject flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Login Request Rejected</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sorry, Your login is not verified. Please contact your ward member for further information.
        </p>
        <div className="flex flex-col items-center gap-2">
          <a
            className="text-sm font-medium text-gray-900 underline transition-colors hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
            href="#" onClick={handleSignUpClick}>
            Are you a new user? Sign up here.
          </a>
        </div>
      </div>
    </div>
)
}

export default LoginRejected;
