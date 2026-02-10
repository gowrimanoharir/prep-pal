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
          <span className="text-text-secondary text-sm">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="text-text-secondary text-sm">
            {Math.round((currentQuestion / totalQuestions) * 100)}%
          </span>
        </div>
        <ProgressBar current={currentQuestion} total={totalQuestions} />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className={`text-base px-2 py-1 border-b-2 border-transparent transition-all
            ${isFirstQuestion 
              ? 'text-text-tertiary cursor-not-allowed' 
              : 'text-text-secondary hover:text-text-primary hover:border-primary'
            }`}
        >
          ← Previous
        </button>

        <div className="flex gap-6">
          {!isLastQuestion && (
            <>
              <button
                onClick={onSkip}
                className="text-text-secondary text-base px-2 py-1 border-b-2 border-transparent hover:text-text-primary hover:border-primary transition-all"
              >
                Skip
              </button>
              <button
                onClick={onNext}
                disabled={!hasAnswer}
                className={`text-base px-2 py-1 border-b-2 border-transparent transition-all
                  ${!hasAnswer 
                    ? 'text-text-tertiary cursor-not-allowed' 
                    : 'text-text-secondary hover:text-text-primary hover:border-primary'
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
            className="bg-primary text-night-darkest font-semibold px-8 py-3 rounded-md hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};
