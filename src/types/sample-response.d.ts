// Type declaration for optional JSON file
declare module '@/data/sample-response.json' {
  const value: {
    category?: string;
    subcategory?: string;
    numqs?: number;
    difficulty?: string;
    questions: Array<{
      question: string;
      topic: string;
      type: 'mcq' | 'tf';
      possible_ans: Record<string, string>;
      answer: string;
    }>;
  };
  export default value;
}
