import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--surface-elevated)] rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-[var(--text-secondary)] text-lg">Generating your quiz...</p>
    </div>
  );
};
