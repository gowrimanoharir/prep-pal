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
    // Results view - Correct answer
    if (isCorrect) {
      return 'bg-[rgba(173,219,103,0.08)] border-l-success border-l-4 border border-[rgba(173,219,103,0.3)]';
    }
    
    // Results view - Wrong answer
    if (isWrong) {
      return 'bg-[rgba(247,140,108,0.08)] border-l-error border-l-4 border border-[rgba(247,140,108,0.3)]';
    }
    
    // Results view - Unselected/neutral
    if (isDisabled && !isSelected) {
      return 'bg-night-dark border-l-border-default border-l-4 border border-border-default opacity-60';
    }

    // Quiz taking view - Selected
    if (isSelected) {
      return 'bg-[rgba(255,203,107,0.1)] border-l-warning border-l-4 border border-warning';
    }

    // Quiz taking view - Default/hover
    return 'bg-night-medium border-l-border-default border-l-4 border border-border-default hover:border-primary hover:bg-[rgba(130,170,255,0.05)]';
  };

  const getLabelStyles = () => {
    if (isCorrect || isWrong) return 'text-text-primary';
    if (isSelected) return 'text-warning font-bold';
    if (isDisabled && !isSelected) return 'text-text-tertiary';
    return 'text-text-secondary';
  };

  const getIcon = () => {
    if (isCorrect) return <span className="text-success font-bold text-xl">✓</span>;
    if (isWrong) return <span className="text-error font-bold text-xl">✗</span>;
    if (isDisabled && !isSelected) return <span className="text-text-tertiary">•</span>;
    return null;
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isDisabled}
      className={`
        w-full rounded-md px-5 py-4
        text-text-primary text-base text-left
        transition-all duration-200 ease-in-out
        flex items-center gap-3
        ${getStyles()}
        ${isDisabled ? 'cursor-default' : 'cursor-pointer'}
      `}
    >
      <span className={`font-semibold min-w-[20px] ${getLabelStyles()}`}>
        {getOptionLabel(optionKey)}
      </span>
      <span className="flex-1">{optionText}</span>
      {getIcon() && (
        <span className="ml-auto">{getIcon()}</span>
      )}
    </button>
  );
};
