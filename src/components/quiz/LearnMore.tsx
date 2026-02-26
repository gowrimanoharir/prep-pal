import React, { useState, useCallback, useEffect } from 'react';
import type { LearnMoreSuccessData } from '@/types/learn-more';

interface LearnMoreProps {
  topic: string;
  category: string;
  subcategory: string;
  difficulty: string;
}

function getResourceIcon(type: string): string {
  switch (type) {
    case 'docs':
      return '📖';
    case 'tutorial':
      return '🎓';
    case 'video':
      return '🎥';
    case 'article':
      return '📝';
    case 'practice':
      return '💪';
    default:
      return '📌';
  }
}

export function LearnMore({
  topic,
  category,
  subcategory,
  difficulty,
}: LearnMoreProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<LearnMoreSuccessData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/learn-more', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category, subcategory, difficulty }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error ?? 'Failed to load resources');
        return;
      }

      setData({
        summary: result.summary ?? '',
        resources: result.resources ?? [],
      });
    } catch {
      setError('Failed to load learning resources. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [topic, category, subcategory, difficulty]);

  const openModal = () => {
    setModalOpen(true);
    if (!data) {
      setError(null);
      void fetchData();
    }
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [modalOpen, closeModal]);

  return (
    <>
      <span className="inline">
        <button
          type="button"
          onClick={openModal}
          className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
        >
          Learn more
        </button>
      </span>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-overlay/80"
          role="dialog"
          aria-modal="true"
          aria-labelledby="learn-more-title"
        >
          <div
            className="absolute inset-0"
            onClick={closeModal}
            role="button"
            tabIndex={-1}
            aria-label="Close modal"
          />
          <div
            className="relative w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col bg-night-dark border border-border-default rounded-lg shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-default shrink-0">
              <h2
                id="learn-more-title"
                className="text-lg font-semibold text-text-primary"
              >
                Learn more: {topic}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-text-tertiary hover:text-text-primary p-1 rounded transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {isLoading && (
                <div className="flex items-center gap-3 text-text-secondary">
                  <div
                    className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"
                    aria-hidden
                  />
                  <span className="text-sm">Finding learning resources...</span>
                </div>
              )}

              {error && !isLoading && (
                <div className="bg-night-medium border border-error rounded-lg p-4 space-y-3">
                  <p className="text-error text-sm">{error}</p>
                  <button
                    type="button"
                    onClick={() => void fetchData()}
                    className="text-sm font-medium text-primary hover:text-primary-hover"
                  >
                    Try again
                  </button>
                </div>
              )}

              {data && !isLoading && (
                <>
                  <div className="bg-night-medium rounded-lg p-4">
                    <h3 className="text-text-primary font-semibold mb-2 flex items-center gap-2">
                      <span>💡</span>
                      Quick Overview
                    </h3>
                    <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                      {data.summary}
                    </div>
                  </div>

                  {data.resources.length > 0 && (
                    <div>
                      <h3 className="text-text-primary font-semibold mb-3">
                        Recommended Resources
                      </h3>
                      <div className="space-y-2">
                        {data.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-night-medium rounded-lg p-3 hover:bg-night-light transition-colors group"
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-lg flex-shrink-0">
                                {getResourceIcon(resource.type)}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-text-primary text-sm font-medium group-hover:text-primary transition-colors truncate">
                                    {resource.title}
                                  </span>
                                  <span className="text-text-tertiary flex-shrink-0">
                                    →
                                  </span>
                                </div>
                                <p className="text-text-tertiary text-xs mt-1 line-clamp-2">
                                  {resource.description}
                                </p>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
