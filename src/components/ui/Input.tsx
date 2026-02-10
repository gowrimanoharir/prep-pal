import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  type = 'text',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[var(--text-primary)] text-base font-medium mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          w-full bg-[var(--surface-elevated)] border border-[var(--border)] rounded-md
          px-4 py-3 text-[var(--text-primary)] text-base
          transition-all duration-200 ease-in-out
          focus:outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]
          hover:border-[var(--primary-light)]
          ${error ? 'border-[var(--error)] bg-[rgba(251,113,133,0.05)]' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <div className="flex items-center gap-1 mt-1 text-[var(--error)] text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  error,
  onIncrement,
  onDecrement,
  value,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#CBD5E1] mb-2">
          {label}
        </label>
      )}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={onDecrement}
          className="bg-[#64748B] border border-[#475569] rounded px-4 py-2
                     text-[#F1F5F9] text-lg transition-colors hover:bg-[#475569]"
        >
          −
        </button>
        <div className="bg-[#64748B] border border-[#475569] rounded px-6 py-2 min-w-[80px] text-center">
          <span className="text-[#F1F5F9] text-lg font-semibold">{value}</span>
        </div>
        <button
          type="button"
          onClick={onIncrement}
          className="bg-[#64748B] border border-[#475569] rounded px-4 py-2
                     text-[#F1F5F9] text-lg transition-colors hover:bg-[#475569]"
        >
          +
        </button>
      </div>
      {error && (
        <div className="flex items-center gap-1 mt-1 text-[var(--error)] text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
