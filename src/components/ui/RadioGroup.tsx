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
        <label className="block text-[var(--text-primary)] text-base font-medium mb-2">
          {label}
        </label>
      )}
      <div className="flex gap-3" role="radiogroup" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            onClick={() => onChange(option.value)}
            className={`
              flex-1 rounded-md px-4 py-3 text-base font-medium
              cursor-pointer transition-all duration-200 ease-in-out
              ${
                value === option.value
                  ? 'bg-[#64748B] border-2 border-[#FCD34D] text-[#F1F5F9] shadow-[inset_0_0_0_2px_#FCD34D]'
                  : 'bg-transparent border border-[#64748B] text-[#CBD5E1] hover:border-[#94A3B8]'
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
