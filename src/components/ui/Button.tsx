import React, { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'nav';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'font-medium transition-all duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]';

  const variantStyles = {
    primary: `
      bg-[var(--primary)] text-[#0F172A] border-none rounded-md px-8 py-3 text-base font-medium
      hover:bg-[var(--primary-hover)]
      disabled:bg-[var(--surface-elevated)] disabled:text-[var(--text-tertiary)] disabled:cursor-not-allowed disabled:opacity-50
    `,
    secondary: `
      bg-transparent text-[var(--primary)] border border-[var(--primary)] rounded-md px-8 py-3 text-base font-medium
      hover:bg-[rgba(59,130,246,0.1)] hover:border-[var(--primary-light)]
    `,
    nav: `
      bg-transparent text-[var(--text-secondary)] border-none px-0 py-2 text-base font-normal
      border-b-2 border-b-transparent
      hover:text-[var(--text-primary)] hover:border-b-[var(--primary)]
      disabled:text-[var(--surface-elevated)] disabled:cursor-not-allowed
    `,
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
