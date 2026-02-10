import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuiz } from '@/contexts/QuizContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorNotification } from '@/components/ui/ErrorNotification';
import {
  CATEGORIES,
  getSubcategoriesByCategory,
  getCategoryDisplay,
  getSubcategoryDisplay,
  DEFAULT_NUM_QUESTIONS,
  MIN_QUESTIONS,
  MAX_QUESTIONS,
} from '@/constants/categories';
import type { DifficultyLevel } from '@/types/quiz.types';

export default function Home() {
  const router = useRouter();
  const { setConfig, setQuestions, setLoading, setError, isLoading, error } = useQuiz();

  const [category, setCategory] = useState<string>('');
  const [subcategory, setSubcategory] = useState<string>('');
  const [numQuestions, setNumQuestions] = useState<number>(DEFAULT_NUM_QUESTIONS);
  const [numQuestionsInput, setNumQuestionsInput] = useState<string>(DEFAULT_NUM_QUESTIONS.toString());
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Beginner');

  const [validationError, setValidationError] = useState<string>('');

  const subcategoryOptions = category ? getSubcategoriesByCategory(category) : [];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setSubcategory('');
  };

  const handleIncrement = () => {
    if (numQuestions < MAX_QUESTIONS) {
      const newValue = numQuestions + 1;
      setNumQuestions(newValue);
      setNumQuestionsInput(newValue.toString());
    }
  };

  const handleDecrement = () => {
    if (numQuestions > MIN_QUESTIONS) {
      const newValue = numQuestions - 1;
      setNumQuestions(newValue);
      setNumQuestionsInput(newValue.toString());
    }
  };

  const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumQuestionsInput(value);
  };

  const handleNumQuestionsBlur = () => {
    const numValue = parseInt(numQuestionsInput);

    if (isNaN(numValue) || numValue < MIN_QUESTIONS) {
      setNumQuestions(MIN_QUESTIONS);
      setNumQuestionsInput(MIN_QUESTIONS.toString());
    } else if (numValue > MAX_QUESTIONS) {
      setNumQuestions(MAX_QUESTIONS);
      setNumQuestionsInput(MAX_QUESTIONS.toString());
    } else {
      setNumQuestions(numValue);
      setNumQuestionsInput(numValue.toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!category) {
      setValidationError('Please select a category');
      return;
    }

    if (!subcategory) {
      setValidationError('Please select a subcategory');
      return;
    }

    const config = {
      category,
      subcategory,
      numQuestions,
      difficulty,
    };

    setConfig(config);
    setLoading(true);

    // Map IDs to display values for the API
    const apiPayload = {
      category: getCategoryDisplay(category),
      subcategory: getSubcategoryDisplay(subcategory),
      numQuestions,
      difficulty,
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-night-darkest">
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Error Messages */}
        {error && (
          <ErrorNotification message={error} onClose={() => setError(null)} autoClose />
        )}
        {validationError && (
          <ErrorNotification message={validationError} onClose={() => setValidationError('')} />
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hero Card - Large Prominent Card */}
          <div className="bg-night-overlay border-t-2 border-t-primary rounded-2xl p-8">
            <h1 className="text-2xl font-semibold text-text-primary mb-2">
              Create Your Quiz
            </h1>
            <p className="text-text-secondary text-base">
              Select your preferences to generate personalized questions
            </p>
          </div>

          {/* Category and Subcategory - Grid of 2 */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category Card */}
            <div className="bg-night-dark rounded-xl p-6">
              <label className="block text-sm font-medium text-text-secondary mb-3">
                Category
              </label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full bg-night-medium border border-border-default rounded-full px-4 py-3 text-text-primary text-base font-sans focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(130,170,255,0.2)] focus:bg-night-light hover:border-border-subtle transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.display}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Card */}
            <div className="bg-night-dark rounded-xl p-6">
              <label className="block text-sm font-medium text-text-secondary mb-3">
                Subcategory
              </label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                disabled={!category}
                className="w-full bg-night-medium border border-border-default rounded-full px-4 py-3 text-text-primary text-base font-sans focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(130,170,255,0.2)] focus:bg-night-light hover:border-border-subtle transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <option value="">Select subcategory</option>
                {subcategoryOptions.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.display}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Number of Questions - Full Width Card */}
          <div className="bg-night-dark rounded-xl p-6">
            <label className="block text-sm font-medium text-text-secondary mb-4 text-center">
              Number of Questions
            </label>
            <div className="text-center mb-4">
              <span className="text-3xl font-bold text-text-primary">{numQuestions}</span>
            </div>
            <div className="flex items-center justify-center gap-4 mb-3">
              <button
                type="button"
                onClick={handleDecrement}
                className="bg-night-medium border border-border-default rounded-full w-10 h-10 flex items-center justify-center text-text-primary text-xl hover:bg-night-light hover:border-primary transition-all"
              >
                −
              </button>
              <input
                type="number"
                value={numQuestionsInput}
                onChange={handleNumQuestionsChange}
                onBlur={handleNumQuestionsBlur}
                min={MIN_QUESTIONS}
                max={MAX_QUESTIONS}
                className="bg-night-medium border border-border-default rounded-full px-6 py-2 w-24 text-center text-text-primary text-lg font-semibold focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(130,170,255,0.2)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="bg-night-medium border border-border-default rounded-full w-10 h-10 flex items-center justify-center text-text-primary text-xl hover:bg-night-light hover:border-primary transition-all"
              >
                +
              </button>
            </div>
            <p className="text-xs text-text-tertiary text-center">
              Choose between {MIN_QUESTIONS} and {MAX_QUESTIONS} questions
            </p>
          </div>

          {/* Difficulty Level Card */}
          <div className="bg-night-dark rounded-xl p-6">
            <label className="block text-sm font-medium text-text-secondary mb-4 text-center">
              Difficulty Level
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDifficulty('Beginner')}
                className={`flex-1 rounded-full px-6 py-3 text-base font-medium transition-all ${
                  difficulty === 'Beginner'
                    ? 'bg-[rgba(255,203,107,0.1)] border-2 border-warning text-text-primary'
                    : 'bg-transparent border border-night-medium text-text-secondary hover:border-primary hover:bg-[rgba(130,170,255,0.05)]'
                }`}
              >
                Beginner
              </button>
              <button
                type="button"
                onClick={() => setDifficulty('Intermediate')}
                className={`flex-1 rounded-full px-6 py-3 text-base font-medium transition-all ${
                  difficulty === 'Intermediate'
                    ? 'bg-[rgba(255,203,107,0.1)] border-2 border-warning text-text-primary'
                    : 'bg-transparent border border-night-medium text-text-secondary hover:border-primary hover:bg-[rgba(130,170,255,0.05)]'
                }`}
              >
                Intermediate
              </button>
              <button
                type="button"
                onClick={() => setDifficulty('Senior')}
                className={`flex-1 rounded-full px-6 py-3 text-base font-medium transition-all ${
                  difficulty === 'Senior'
                    ? 'bg-[rgba(255,203,107,0.1)] border-2 border-warning text-text-primary'
                    : 'bg-transparent border border-night-medium text-text-secondary hover:border-primary hover:bg-[rgba(130,170,255,0.05)]'
                }`}
              >
                Senior
              </button>
            </div>
          </div>

          {/* Generate Button - Centered */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-primary text-night-darkest font-semibold px-8 py-3 rounded-full text-lg hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Generate Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
