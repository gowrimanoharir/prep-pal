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
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <select
        className={`
          w-full bg-night-medium border border-border-default rounded-md
          px-4 py-3 text-text-primary text-base
          transition-all duration-200 ease-in-out
          hover:border-border-subtle
          focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(130,170,255,0.2)] focus:bg-night-light
          ${error ? 'border-error bg-[rgba(247,140,108,0.08)]' : ''}
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
        <div className="flex items-center gap-1 mt-1 text-error text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
