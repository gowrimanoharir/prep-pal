import React, { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
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
      <select
        className={`
          w-full bg-[#64748B] border border-[#475569] rounded-md
          px-4 py-3 text-[#F1F5F9] text-base
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent
          ${error ? 'border-[#FB7185] bg-[rgba(251,113,133,0.05)]' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div className="flex items-center gap-1 mt-1 text-[var(--error)] text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
