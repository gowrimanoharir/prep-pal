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
  const baseStyles = 'font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none';

  const variantStyles = {
    primary: `
      bg-primary text-night-darkest border-none rounded-md px-8 py-3 text-base font-semibold
      hover:bg-primary-hover hover:-translate-y-0.5
      active:translate-y-0
      disabled:bg-night-medium disabled:text-text-tertiary disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none
      focus-visible:shadow-[0_0_0_3px_rgba(130,170,255,0.4)] focus-visible:border-primary
    `,
    secondary: `
      bg-transparent text-primary border border-primary rounded-md px-8 py-3 text-base font-medium
      hover:bg-[rgba(130,170,255,0.15)] hover:border-primary-light
      focus-visible:shadow-[0_0_0_3px_rgba(130,170,255,0.4)]
    `,
    nav: `
      bg-transparent text-text-secondary border-none px-0 py-2 text-base font-normal
      border-b-2 border-b-transparent
      hover:text-text-primary hover:border-b-primary
      disabled:text-text-tertiary disabled:cursor-not-allowed
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
