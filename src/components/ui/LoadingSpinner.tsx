import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-night-darkest">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-night-medium rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin shadow-glow-primary"></div>
      </div>
      <p className="mt-4 text-text-secondary text-lg">Generating your quiz...</p>
    </div>
  );
};
