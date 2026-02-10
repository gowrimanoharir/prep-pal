import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { QuizState, QuizConfig, Question, UserAnswers } from '@/types/quiz.types';

interface QuizContextType extends QuizState {
  setConfig: (config: QuizConfig) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setUserAnswer: (questionIndex: number, answer: string) => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
  startNewQuiz: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const initialState: QuizState = {
  config: null,
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  isSubmitted: false,
  isLoading: false,
  error: null,
};

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuizState>(initialState);

  const setConfig = (config: QuizConfig) => {
    setState(prev => ({ ...prev, config }));
  };

  const setQuestions = (questions: Question[]) => {
    setState(prev => ({ ...prev, questions }));
  };

  const setCurrentQuestionIndex = (index: number) => {
    setState(prev => ({ ...prev, currentQuestionIndex: index }));
  };

  const setUserAnswer = (questionIndex: number, answer: string) => {
    setState(prev => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [questionIndex]: answer,
      },
    }));
  };

  const submitQuiz = () => {
    setState(prev => ({ ...prev, isSubmitted: true }));
  };

  const resetQuiz = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      userAnswers: {},
      isSubmitted: false,
    }));
  };

  const startNewQuiz = () => {
    setState(initialState);
  };

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const goToNextQuestion = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1),
    }));
  };

  const goToPreviousQuestion = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0),
    }));
  };

  const value: QuizContextType = {
    ...state,
    setConfig,
    setQuestions,
    setCurrentQuestionIndex,
    setUserAnswer,
    submitQuiz,
    resetQuiz,
    startNewQuiz,
    setLoading,
    setError,
    goToNextQuestion,
    goToPreviousQuestion,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
