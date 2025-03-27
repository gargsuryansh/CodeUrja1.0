import React from 'react';

const Spinner = ({ size = 'medium', color = 'blue' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]} 
          border-4 border-t-4 border-t-transparent 
          rounded-full 
          animate-spin
        `}
      ></div>
    </div>
  );
};

export default Spinner;