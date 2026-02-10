import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  className = '',
}) => {
  const percentage = (current / total) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full h-1.5 bg-night-medium rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-hover transition-all duration-300 ease-in-out shadow-glow-primary"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`Progress: ${current} of ${total} questions`}
        />
      </div>
    </div>
  );
};
