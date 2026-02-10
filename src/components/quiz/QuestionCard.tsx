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
    <div className="bg-[#334155] border border-[#475569] rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-start p-6 border-b border-[#475569]">
        <div>
          <h2 className="text-xl font-semibold text-[#F1F5F9] mb-1">
            Question {questionNumber}
          </h2>
          <p className="text-sm text-[#94A3B8]">Topic: {topic}</p>
        </div>
        <span className="bg-[#64748B] px-3 py-1 rounded text-xs text-[#F1F5F9]">
          {getCategoryDisplay(category)} / {getSubcategoryDisplay(subcategory)} / {difficulty}
        </span>
      </div>

      {/* Question Text */}
      <div className="p-6 border-b border-[#475569]">
        <p className="text-base text-[#F1F5F9] leading-relaxed">
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
