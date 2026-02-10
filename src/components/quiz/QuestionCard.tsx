import React from 'react';
import type { Question } from '@/types/quiz.types';
import { AnswerOption } from './AnswerOption';
import { getCategoryDisplay, getSubcategoryDisplay } from '@/constants/categories';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | undefined;
  onAnswerSelect: (answer: string) => void;
  category: string;
  subcategory: string;
  difficulty: string;
  isResultView?: boolean;
  userAnswer?: string | null;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  category,
  subcategory,
  difficulty,
  isResultView = false,
  userAnswer = null,
}) => {
  const { question: questionText, topic, type, possible_ans, answer } = question;

  const options = Object.entries(possible_ans) as [string, string][];

  return (
    <div className="bg-night-dark border border-border-default rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-start p-6 border-b border-border-default">
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-1">
            Question {questionNumber}
          </h2>
          <p className="text-sm text-text-secondary">Topic: <span className="font-semibold text-text-primary">{topic}</span></p>
        </div>
        <span className="bg-[rgba(199,146,234,0.15)] border border-[rgba(199,146,234,0.3)] text-purple px-3 py-1.5 rounded text-sm font-medium">
          {getCategoryDisplay(category)} / {getSubcategoryDisplay(subcategory)} / {difficulty}
        </span>
      </div>

      {/* Question Text */}
      <div className="p-6 border-b border-border-default">
        <p className="text-base text-text-primary leading-relaxed">
          {questionText}
        </p>
      </div>

      {/* Answer Options */}
      <div className="p-6 space-y-3">
        {options.map(([optionKey, optionText]) => {
          const isCorrectAnswer = optionKey === answer;
          const isUserAnswer = optionKey === userAnswer;
          const isSelected = isResultView ? isUserAnswer : optionKey === selectedAnswer;

          return (
            <AnswerOption
              key={optionKey}
              optionKey={optionKey}
              optionText={optionText}
              isSelected={isSelected}
              isCorrect={isResultView && isCorrectAnswer}
              isWrong={isResultView && isUserAnswer && !isCorrectAnswer}
              isDisabled={isResultView}
              onSelect={() => !isResultView && onAnswerSelect(optionKey)}
            />
          );
        })}
      </div>
    </div>
  );
};
