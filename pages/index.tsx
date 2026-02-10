import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
    setValidationError('');
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
    setNumQuestionsInput(value); // Allow any input while typing
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
    setError(null);

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
    <div className="min-h-screen bg-night-darkest py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Title Card */}
        <div className="bg-night-dark border border-border-default rounded-lg shadow-card p-6 mb-6">
          <Link href="/">
            <h1 className="text-2xl font-semibold text-text-primary text-center cursor-pointer hover:text-primary transition-colors">
              Prep Pal
            </h1>
          </Link>
        </div>

        {/* Error Messages */}
        {error && (
          <ErrorNotification message={error} onClose={() => setError(null)} autoClose />
        )}
        {validationError && (
          <ErrorNotification message={validationError} onClose={() => setValidationError('')} />
        )}

        {/* Form Cards */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Card */}
          <div className="bg-night-dark border border-border-default rounded-lg shadow-card p-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full bg-night-medium border border-border-default rounded-md px-4 py-3 text-text-primary text-base focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(130,170,255,0.2)] focus:bg-night-light hover:border-border-subtle transition-all"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.display}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Card */}
          <div className="bg-night-dark border border-border-default rounded-lg shadow-card p-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Subcategory
            </label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              disabled={!category}
              className="w-full bg-night-medium border border-border-default rounded-md px-4 py-3 text-text-primary text-base focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(130,170,255,0.2)] focus:bg-night-light hover:border-border-subtle transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select a subcategory</option>
              {subcategoryOptions.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.display}
                </option>
              ))}
            </select>
          </div>

          {/* Number of Questions Card */}
          <div className="bg-night-dark border border-border-default rounded-lg shadow-card p-6">
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Number of Questions
            </label>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleDecrement}
                className="bg-night-medium border border-border-default rounded px-4 py-2 text-text-primary text-lg hover:bg-night-light hover:border-primary transition-all"
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
                className="bg-night-medium border border-border-default rounded px-6 py-2 w-20 text-center text-text-primary text-lg font-semibold focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(130,170,255,0.2)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="bg-night-medium border border-border-default rounded px-4 py-2 text-text-primary text-lg hover:bg-night-light hover:border-primary transition-all"
              >
                +
              </button>
            </div>
            <p className="text-xs text-text-tertiary text-center mt-3">
              Choose between {MIN_QUESTIONS} and {MAX_QUESTIONS} questions
            </p>
          </div>

          {/* Difficulty Level Card */}
          <div className="bg-night-dark border border-border-default rounded-lg shadow-card p-6">
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Difficulty Level
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setDifficulty('Beginner')}
                className={`flex-1 rounded-md px-6 py-3 text-base font-medium transition-all ${
                  difficulty === 'Beginner'
                    ? 'bg-[rgba(255,203,107,0.1)] border-2 border-warning text-text-primary font-medium shadow-[0_0_12px_rgba(255,203,107,0.3),inset_0_0_0_1px_#FFCB6B]'
                    : 'bg-transparent border border-night-medium text-text-secondary hover:border-primary hover:bg-[rgba(130,170,255,0.05)]'
                }`}
              >
                Beginner
              </button>
              <button
                type="button"
                onClick={() => setDifficulty('Intermediate')}
                className={`flex-1 rounded-md px-6 py-3 text-base font-medium transition-all ${
                  difficulty === 'Intermediate'
                    ? 'bg-[rgba(255,203,107,0.1)] border-2 border-warning text-text-primary font-medium shadow-[0_0_12px_rgba(255,203,107,0.3),inset_0_0_0_1px_#FFCB6B]'
                    : 'bg-transparent border border-night-medium text-text-secondary hover:border-primary hover:bg-[rgba(130,170,255,0.05)]'
                }`}
              >
                Intermediate
              </button>
              <button
                type="button"
                onClick={() => setDifficulty('Senior')}
                className={`flex-1 rounded-md px-6 py-3 text-base font-medium transition-all ${
                  difficulty === 'Senior'
                    ? 'bg-[rgba(255,203,107,0.1)] border-2 border-warning text-text-primary font-medium shadow-[0_0_12px_rgba(255,203,107,0.3),inset_0_0_0_1px_#FFCB6B]'
                    : 'bg-transparent border border-night-medium text-text-secondary hover:border-primary hover:bg-[rgba(130,170,255,0.05)]'
                }`}
              >
                Senior
              </button>
            </div>
          </div>

          {/* Generate Button - Centered, Outside Cards */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-primary text-night-darkest font-semibold px-8 py-3 rounded-md hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-[0_2px_8px_rgba(130,170,255,0.3)] hover:shadow-[0_4px_12px_rgba(130,170,255,0.5)]"
            >
              Generate Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
