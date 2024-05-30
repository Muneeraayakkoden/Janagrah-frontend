
import React from 'react';

function ResidentSignupSuccess() {
  return (
    <div className="regbg">
      <div className=" reject flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
        <div className="container max-w-md space-y-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Registration Successful!</h1>
          <p className="text-gray-600 dark:text-gray-400">
          Thank you for registering. You will receive an email after verification by your ward member.</p><p >Please wait for approval.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResidentSignupSuccess;
