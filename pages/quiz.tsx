import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuiz } from '@/contexts/QuizContext';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { QuizNavigation } from '@/components/quiz/QuizNavigation';
import { ErrorNotification } from '@/components/ui/ErrorNotification';

export default function QuizPage() {
  const router = useRouter();
  const {
    config,
    questions,
    currentQuestionIndex,
    userAnswers,
    setUserAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    setCurrentQuestionIndex,
    submitQuiz,
  } = useQuiz();

  const [showError, setShowError] = useState(false);

  // Redirect if no quiz is loaded
  React.useEffect(() => {
    if (!config || questions.length === 0) {
      router.push('/');
    }
  }, [config, questions, router]);

  if (!config || questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setUserAnswer(currentQuestionIndex, answer);
  };

  const handleNext = () => {
    goToNextQuestion();
  };

  const handlePrevious = () => {
    goToPreviousQuestion();
  };

  const handleSkip = () => {
    goToNextQuestion();
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    const unansweredCount = questions.length - Object.keys(userAnswers).length;
    
    if (unansweredCount > 0) {
      setShowError(true);
      return;
    }

    submitQuiz();
    router.push('/results');
  };

  return (
    <div className="min-h-screen bg-[#475569] py-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-slate-700 border border-slate-600 rounded-lg shadow-sm p-6 mb-6">
          <Link href="/">
            <h1 className="text-2xl font-semibold text-slate-50 text-center cursor-pointer hover:text-blue-400 transition-colors">
              Prep Pal
            </h1>
          </Link>
        </div>

        {showError && (
          <ErrorNotification
            message="Please answer all questions before submitting"
            onClose={() => setShowError(false)}
            autoClose
          />
        )}

        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          category={config.category}
          subcategory={config.subcategory}
          difficulty={config.difficulty}
        />

        <QuizNavigation
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          hasAnswer={!!selectedAnswer}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSkip={handleSkip}
          onSubmit={handleSubmit}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      </div>
    </div>
  );
}
