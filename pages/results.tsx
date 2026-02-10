import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuiz } from '@/contexts/QuizContext';
import { ScoreSummary } from '@/components/quiz/ScoreSummary';
import { ResultCard } from '@/components/quiz/ResultCard';

export default function ResultsPage() {
  const router = useRouter();
  const {
    config,
    questions,
    userAnswers,
    isSubmitted,
    resetQuiz,
    startNewQuiz,
    setQuestions,
    setLoading,
    setError,
  } = useQuiz();

  // Redirect if quiz not submitted
  React.useEffect(() => {
    if (!config || questions.length === 0 || !isSubmitted) {
      router.push('/');
    }
  }, [config, questions, isSubmitted, router]);

  if (!config || questions.length === 0 || !isSubmitted) {
    return null;
  }

  // Calculate score
  const results = questions.map((question, index) => {
    const userAnswer = userAnswers[index] || null;
    const isCorrect = userAnswer === question.answer;
    return {
      question,
      userAnswer,
      isCorrect,
      questionIndex: index,
    };
  });

  const score = results.filter((r) => r.isCorrect).length;

  const handleTryAgain = async () => {
    if (!config) return;
    
    resetQuiz();
    setLoading(true);

    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz');
      }

      const data = await response.json();
      setQuestions(data.questions);
      setLoading(false);
      router.push('/quiz');
    } catch (err) {
      setLoading(false);
      setError('Failed to generate quiz. Please try again.');
      console.error(err);
    }
  };

  const handleNewQuiz = () => {
    startNewQuiz();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#475569] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-slate-700 border border-slate-600 rounded-lg shadow-sm p-6 mb-6">
          <Link href="/">
            <h1 className="text-2xl font-semibold text-slate-50 text-center cursor-pointer hover:text-blue-400 transition-colors">
              Prep Pal
            </h1>
          </Link>
        </div>

        <ScoreSummary 
          score={score} 
          total={questions.length}
          category={config.category}
          subcategory={config.subcategory}
          difficulty={config.difficulty}
        />

        <div className="space-y-6">
          {results.map((result, index) => (
            <ResultCard
              key={index}
              question={result.question}
              questionNumber={index + 1}
              userAnswer={result.userAnswer}
              isCorrect={result.isCorrect}
              topic={result.question.topic}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4 pb-8">
          <button
            onClick={handleTryAgain}
            className="bg-transparent border border-[#3B82F6] text-[#3B82F6] px-6 py-3 rounded-md hover:bg-[#3B82F6] hover:bg-opacity-10 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={handleNewQuiz}
            className="bg-transparent border border-[#3B82F6] text-[#3B82F6] px-6 py-3 rounded-md hover:bg-[#3B82F6] hover:bg-opacity-10 transition-colors"
          >
            New Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
