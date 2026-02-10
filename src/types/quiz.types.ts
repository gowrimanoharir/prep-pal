// Question type - MCQ or True/False
export type QuestionType = 'mcq' | 'tf';

// Difficulty levels
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Senior';

// Answer options for questions
export interface PossibleAnswers {
  optionA: string;
  optionB: string;
  optionC?: string;
  optionD?: string;
}

// Individual question structure
export interface Question {
  question: string;
  topic: string;
  type: QuestionType;
  possible_ans: PossibleAnswers;
  answer: 'optionA' | 'optionB' | 'optionC' | 'optionD';
}

// Quiz configuration (user inputs)
export interface QuizConfig {
  category: string;
  subcategory: string;
  numQuestions: number;
  difficulty: DifficultyLevel;
}

// API Response structure
export interface QuizApiResponse {
  category: string;
  subcategory: string;
  numqs: number;
  difficulty: string;
  questions: Question[];
}

// User's answer tracking
export type UserAnswers = Record<number, string>; // questionIndex -> selected option (e.g., 'optionA')

// Quiz state for Context
export interface QuizState {
  config: QuizConfig | null;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswers;
  isSubmitted: boolean;
  isLoading: boolean;
  error: string | null;
}

// Result computation
export interface QuizResult {
  question: Question;
  userAnswer: string | null;
  isCorrect: boolean;
  questionIndex: number;
}
