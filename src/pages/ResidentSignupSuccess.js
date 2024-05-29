
import React from 'react';

function ResidentSignupSuccess() {
  return (
    <div style={successpage}>
      <div  className="container reject flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
        <div className="max-w-md space-y-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Registration Successful!</h2>
          <p className="text-gray-600 dark:text-gray-400">Your account has been created successfully. It will be verified by the official ward member.</p><p >Please wait for approval.</p>
        </div>
      </div>
    </div>
  );
}

const successpage = {
  backgroundImage: 'url("../assets/image1.jpg")'
};

export default ResidentSignupSuccess;
