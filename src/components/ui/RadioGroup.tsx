import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  name,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-text-secondary text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <div className="flex gap-4" role="radiogroup" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            onClick={() => onChange(option.value)}
            className={`
              flex-1 rounded-md px-6 py-3 text-base font-medium
              cursor-pointer transition-all duration-200 ease-in-out
              ${
                value === option.value
                  ? 'bg-[rgba(255,203,107,0.1)] border-2 border-warning text-text-primary font-medium'
                  : 'bg-transparent border border-night-medium text-text-secondary hover:border-primary hover:bg-[rgba(130,170,255,0.05)]'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
