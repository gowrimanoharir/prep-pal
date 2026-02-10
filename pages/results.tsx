import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuiz } from '@/contexts/QuizContext';
import { ScoreSummary } from '@/components/quiz/ScoreSummary';
import { ResultCard } from '@/components/quiz/ResultCard';
import { getCategoryDisplay, getSubcategoryDisplay } from '@/constants/categories';

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

    // Map IDs to display values for the API
    const apiPayload = {
      category: getCategoryDisplay(config.category),
      subcategory: getSubcategoryDisplay(config.subcategory),
      numQuestions: config.numQuestions,
      difficulty: config.difficulty,
    };

    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        setLoading(false);
        setError(errorData.error || 'Failed to generate quiz. Please try again.');
        return;
      }

      const data = await response.json();
      
      if (!data.questions || !Array.isArray(data.questions)) {
        setLoading(false);
        setError('Invalid quiz data received. Please try again.');
        return;
      }
      
      if (data.questions.length === 0) {
        setLoading(false);
        setError('No questions generated. Please try again.');
        return;
      }
      
      setQuestions(data.questions);
      setLoading(false);
      router.push('/quiz');
    } catch (err) {
      setLoading(false);
      setError('Network error. Please check your connection and try again.');
    }
  };

  const handleNewQuiz = () => {
    startNewQuiz();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-night-darkest py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-night-dark border border-border-default rounded-lg shadow-card p-6 mb-6">
          <Link href="/">
            <h1 className="text-2xl font-semibold text-text-primary text-center cursor-pointer hover:text-primary transition-colors">
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
            className="bg-transparent border border-primary text-primary px-8 py-3 rounded-md font-medium hover:bg-[rgba(130,170,255,0.15)] hover:border-primary-light hover:shadow-glow-primary transition-all"
          >
            Try Again
          </button>
          <button
            onClick={handleNewQuiz}
            className="bg-primary text-night-darkest font-semibold px-8 py-3 rounded-md hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-[0_2px_8px_rgba(130,170,255,0.3)] hover:shadow-[0_4px_12px_rgba(130,170,255,0.5)]"
          >
            New Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
