import React from 'react';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  hasAnswer: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
  onSubmit: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentQuestion,
  totalQuestions,
  hasAnswer,
  onPrevious,
  onNext,
  onSkip,
  onSubmit,
  isFirstQuestion,
  isLastQuestion,
}) => {
  return (
    <div className="mt-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#CBD5E1] text-sm">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="text-[#CBD5E1] text-sm">
            {Math.round((currentQuestion / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full h-1 bg-[#64748B] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#3B82F6] transition-all duration-300" 
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className={`text-base px-2 py-1 border-b-2 border-transparent transition-all
            ${isFirstQuestion 
              ? 'text-[#64748B] cursor-not-allowed opacity-50' 
              : 'text-[#CBD5E1] hover:text-[#F1F5F9] hover:border-[#3B82F6]'
            }`}
        >
          ← Previous
        </button>

        <div className="flex gap-4">
          {!isLastQuestion && (
            <>
              <button
                onClick={onSkip}
                className="text-[#CBD5E1] text-base px-2 py-1 border-b-2 border-transparent hover:text-[#F1F5F9] hover:border-[#3B82F6] transition-all"
              >
                Skip
              </button>
              <button
                onClick={onNext}
                disabled={!hasAnswer}
                className={`text-base px-2 py-1 border-b-2 border-transparent transition-all
                  ${!hasAnswer 
                    ? 'text-[#64748B] cursor-not-allowed opacity-50' 
                    : 'text-[#CBD5E1] hover:text-[#F1F5F9] hover:border-[#3B82F6]'
                  }`}
              >
                Continue →
              </button>
            </>
          )}
        </div>
      </div>

      {/* Submit Button - Centered below navigation */}
      {isLastQuestion && (
        <div className="flex justify-center mt-6">
          <button
            onClick={onSubmit}
            className="bg-[#3B82F6] text-[#0F172A] font-medium px-8 py-3 rounded-md hover:bg-[#2563EB] transition-colors text-base"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};
