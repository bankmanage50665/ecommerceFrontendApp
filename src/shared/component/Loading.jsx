import React from 'react';

const Loading = ({ text = "Loading", textColor = "text-yellow-300" }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <p className={`text-3xl font-luxury ${textColor} animate-pulse`}>
        {text}<span className="animate-ellipsis">...</span>
      </p>
    </div>
  );
};

export default Loading;