import React from 'react';
import type { Question } from '@/types/quiz.types';

interface AnswerOptionProps {
  optionKey: string;
  optionText: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  isDisabled?: boolean;
  onSelect: () => void;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  optionKey,
  optionText,
  isSelected,
  isCorrect,
  isWrong,
  isDisabled,
  onSelect,
}) => {
  const getOptionLabel = (key: string) => {
    const labels: Record<string, string> = {
      optionA: 'A',
      optionB: 'B',
      optionC: 'C',
      optionD: 'D',
    };
    return labels[key] || '';
  };

  const getStyles = () => {
    // Results view
    if (isCorrect) {
      return 'bg-[rgba(16,185,129,0.1)] border-l-[#10B981] border-l-4 border border-[#475569]';
    }
    if (isWrong) {
      return 'bg-[rgba(251,113,133,0.1)] border-l-[#FB7185] border-l-4 border border-[#475569]';
    }
    if (isDisabled && !isSelected) {
      return 'bg-[#334155] bg-opacity-30 border-l-[#475569] border-l-4 border border-[#475569] opacity-70';
    }

    // Quiz taking view
    if (isSelected) {
      return 'bg-[#64748B] border-l-[#FCD34D] border-l-4 border border-[#475569]';
    }

    return 'bg-[#64748B] border-l-[#475569] border-l-4 border border-[#475569] hover:border-[#60A5FA]';
  };

  const getIcon = () => {
    if (isCorrect) return <span className="text-[#10B981] font-bold text-lg">✓</span>;
    if (isWrong) return <span className="text-[#FB7185] font-bold text-lg">✗</span>;
    return <span className="text-[#94A3B8]">•</span>;
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isDisabled}
      className={`
        w-full rounded-md px-4 py-4
        text-[#F1F5F9] text-base text-left
        transition-all duration-200 ease-in-out
        flex items-start gap-3
        ${getStyles()}
        ${isDisabled ? 'cursor-default' : 'cursor-pointer'}
      `}
    >
      <span className="font-semibold min-w-[24px]">{getOptionLabel(optionKey)}</span>
      <span className="flex-1">{optionText}</span>
      {(isCorrect || isWrong || (isDisabled && !isSelected)) && (
        <span className="ml-auto">{getIcon()}</span>
      )}
    </button>
  );
};
