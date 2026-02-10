import React, { useEffect } from 'react';

interface ErrorNotificationProps {
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  onClose,
  autoClose = false,
  duration = 5000,
}) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose, duration]);

  return (
    <div
      className="bg-[rgba(251,113,133,0.1)] border border-[var(--error)] rounded-lg p-4 mb-4
                 flex items-center justify-between gap-4"
      role="alert"
    >
      <div className="flex items-center gap-2">
        <span className="text-[var(--error)] font-bold text-lg">⚠</span>
        <p className="text-[var(--error)] text-base">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-[var(--error)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Close notification"
        >
          ✕
        </button>
      )}
    </div>
  );
};
