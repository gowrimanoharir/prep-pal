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
        bg-[#334155] border border-[#475569] rounded-lg overflow-hidden mb-6
        ${
          isCorrect
            ? 'border-l-4 border-l-[#10B981]'
            : 'border-l-4 border-l-[#FB7185]'
        }
      `}
      style={{
        background: isCorrect
          ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, #334155 8px)'
          : 'linear-gradient(90deg, rgba(251, 113, 133, 0.1) 0%, #334155 8px)'
      }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#475569] flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-[#F1F5F9]">
              Question {questionNumber}
            </h3>
            {isCorrect ? (
              <span className="text-[#10B981] text-xl font-bold">✓</span>
            ) : (
              <span className="text-[#FB7185] text-xl font-bold">✗</span>
            )}
          </div>
          <p className="text-sm text-[#94A3B8]">
            Topic: {topic}
          </p>
        </div>
      </div>

      {/* Question Text */}
      <div className="px-6 py-4 border-b border-[#475569]">
        <p className="text-base text-[#F1F5F9]">
          {questionText}
        </p>
      </div>

      {/* Answer Options */}
      <div className="px-6 py-4 space-y-2">
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
