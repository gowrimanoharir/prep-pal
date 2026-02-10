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
    <div className="bg-[#334155] border border-[#475569] rounded-lg p-8 text-center mb-8">
      <h1 className="text-3xl font-semibold text-[#F1F5F9] mb-2">
        Quiz Complete!
      </h1>
      <div className="mb-3">
        <span className="bg-[#64748B] px-3 py-1 rounded text-sm text-[#F1F5F9]">
          {getCategoryDisplay(category)} / {getSubcategoryDisplay(subcategory)} / {difficulty}
        </span>
      </div>
      <div className="my-4">
        <span className="text-5xl font-bold text-[#F1F5F9]">
          {score}
        </span>
        <span className="text-2xl text-[#94A3B8]">
          {' '}/{' '}{total}
        </span>
      </div>
      <p className="text-xl text-[#CBD5E1]">
        Your Score: {percentage}%
      </p>
    </div>
  );
};
