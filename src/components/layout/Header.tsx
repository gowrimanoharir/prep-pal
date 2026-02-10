import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header: React.FC = () => {
  const router = useRouter();

  const handleNewQuiz = () => {
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-night-dark bg-opacity-95 backdrop-blur-sm border-b border-night-light">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Link href="/">
            <div className="cursor-pointer group flex items-center gap-3">
              <img src="/logo.svg" alt="Prep Pal Logo" className="h-12" />
              <span className="text-xs text-comment tracking-widest hidden sm:block">QUIZ. LEARN. MASTER.</span>
              <span className="text-xs text-comment tracking-wider hidden sm:block ml-auto">AI-Powered</span>
            </div>
          </Link>

          {/* New Quiz Button */}
          <button
            onClick={handleNewQuiz}
            className="bg-primary text-night-darkest px-4 py-2 rounded-full font-medium hover:bg-primary-hover transition-all"
          >
            New Quiz
          </button>
        </div>
      </div>
    </header>
  );
};
