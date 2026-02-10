import React from 'react';
import type { Question } from '@/types/quiz.types';
import { AnswerOption } from './AnswerOption';

interface ResultCardProps {
  question: Question;
  questionNumber: number;
  userAnswer: string | null;
  isCorrect: boolean;
  topic: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  question,
  questionNumber,
  userAnswer,
  isCorrect,
  topic,
}) => {
  const { question: questionText, possible_ans, answer } = question;
  const options = Object.entries(possible_ans) as [string, string][];

  return (
    <div
      className={`
        bg-night-dark border border-border-default rounded-lg overflow-hidden mb-4
        ${
          isCorrect
            ? 'border-l-4 border-l-success'
            : 'border-l-4 border-l-error'
        }
      `}
      style={{
        background: isCorrect
          ? 'linear-gradient(90deg, rgba(173, 219, 103, 0.15) 0%, #0B2942 12px)'
          : 'linear-gradient(90deg, rgba(247, 140, 108, 0.15) 0%, #0B2942 12px)'
      }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-border-default flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-text-primary">
              Question {questionNumber}
            </h3>
            {isCorrect ? (
              <span className="text-success text-2xl font-bold">✓</span>
            ) : (
              <span className="text-error text-2xl font-bold">✗</span>
            )}
          </div>
          <p className="text-sm text-text-secondary">
            Topic: <span className="font-semibold text-text-primary">{topic}</span>
          </p>
        </div>
      </div>

      {/* Question Text */}
      <div className="px-6 py-5 border-b border-border-default">
        <p className="text-base text-text-primary leading-relaxed">
          {questionText}
        </p>
      </div>

      {/* Answer Options */}
      <div className="px-6 py-5 space-y-3">
        {options.map(([optionKey, optionText]) => {
          const isCorrectAnswer = optionKey === answer;
          const isUserAnswer = optionKey === userAnswer;

          return (
            <AnswerOption
              key={optionKey}
              optionKey={optionKey}
              optionText={optionText}
              isSelected={isUserAnswer}
              isCorrect={isCorrectAnswer}
              isWrong={isUserAnswer && !isCorrectAnswer}
              isDisabled={true}
              onSelect={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
};
