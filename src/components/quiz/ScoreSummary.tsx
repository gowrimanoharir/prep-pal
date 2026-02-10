import React from 'react';
import { getCategoryDisplay, getSubcategoryDisplay } from '@/constants/categories';

interface ScoreSummaryProps {
  score: number;
  total: number;
  category: string;
  subcategory: string;
  difficulty: string;
}

export const ScoreSummary: React.FC<ScoreSummaryProps> = ({ score, total, category, subcategory, difficulty }) => {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="bg-night-light border border-border-subtle rounded-lg p-8 text-center mb-8 shadow-elevated">
      <h1 className="text-3xl font-semibold text-text-primary mb-3">
        Quiz Complete!
      </h1>
      <div className="mb-4">
        <span className="bg-[rgba(199,146,234,0.15)] border border-[rgba(199,146,234,0.3)] text-purple px-4 py-1.5 rounded text-sm font-medium">
          {getCategoryDisplay(category)} / {getSubcategoryDisplay(subcategory)} / {difficulty}
        </span>
      </div>
      <div className="my-6">
        <span className="text-5xl font-bold text-primary" style={{textShadow: '0 0 20px rgba(130, 170, 255, 0.5)'}}>
          {score}
        </span>
        <span className="text-2xl text-text-secondary">
          {' '}/{' '}{total}
        </span>
      </div>
      <p className="text-xl text-text-secondary font-medium">
        Your Score: {percentage}%
      </p>
    </div>
  );
};
