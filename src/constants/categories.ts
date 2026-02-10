export interface CategoryOption {
  id: string;
  display: string;
}

export interface SubcategoryOption {
  id: string;
  display: string;
  categoryId: string;
}

// Hardcoded categories
export const CATEGORIES: CategoryOption[] = [
  { id: 'programming-languages', display: 'Programming Languages' },
  { id: 'frontend-development', display: 'Front End Development' },
  { id: 'backend-development', display: 'Backend Development' },
  { id: 'artificial-intelligence', display: 'Artificial Intelligence' },
  { id: 'systems-design', display: 'Systems Design' },
  { id: 'databases', display: 'Databases' },
  { id: 'devops-cloud', display: 'DevOps & Cloud' },
  { id: 'data-structures-algorithms', display: 'Data Structures & Algorithms' },
];

// Hardcoded subcategories with parent category reference
export const SUBCATEGORIES: SubcategoryOption[] = [
  // Programming Languages subcategories
  { id: 'javascript', display: 'JavaScript', categoryId: 'programming-languages' },
  { id: 'python', display: 'Python', categoryId: 'programming-languages' },
  { id: 'java', display: 'Java', categoryId: 'programming-languages' },
  { id: 'typescript', display: 'TypeScript', categoryId: 'programming-languages' },
  { id: 'cpp', display: 'C++', categoryId: 'programming-languages' },
  { id: 'go', display: 'Go (Golang)', categoryId: 'programming-languages' },
  { id: 'rust', display: 'Rust', categoryId: 'programming-languages' },
  { id: 'csharp', display: 'C#', categoryId: 'programming-languages' },
  { id: 'php', display: 'PHP', categoryId: 'programming-languages' },
  { id: 'swift', display: 'Swift', categoryId: 'programming-languages' },
  { id: 'kotlin', display: 'Kotlin', categoryId: 'programming-languages' },

  // Front End Development subcategories
  { id: 'react', display: 'React', categoryId: 'frontend-development' },
  { id: 'vue', display: 'Vue.js', categoryId: 'frontend-development' },
  { id: 'angular', display: 'Angular', categoryId: 'frontend-development' },
  { id: 'html-css', display: 'HTML & CSS', categoryId: 'frontend-development' },
  { id: 'nextjs', display: 'Next.js', categoryId: 'frontend-development' },
  { id: 'svelte', display: 'Svelte', categoryId: 'frontend-development' },
  { id: 'tailwind', display: 'Tailwind CSS', categoryId: 'frontend-development' },
  { id: 'web-performance', display: 'Web Performance', categoryId: 'frontend-development' },
  { id: 'accessibility', display: 'Accessibility (a11y)', categoryId: 'frontend-development' },
  { id: 'state-management', display: 'State Management', categoryId: 'frontend-development' },
  { id: 'frontend-typescript', display: 'TypeScript for Frontend', categoryId: 'frontend-development' },

  // Backend Development subcategories
  { id: 'nodejs', display: 'Node.js', categoryId: 'backend-development' },
  { id: 'express', display: 'Express.js', categoryId: 'backend-development' },
  { id: 'django', display: 'Django', categoryId: 'backend-development' },
  { id: 'flask', display: 'Flask', categoryId: 'backend-development' },
  { id: 'spring-boot', display: 'Spring Boot', categoryId: 'backend-development' },
  { id: 'fastapi', display: 'FastAPI', categoryId: 'backend-development' },
  { id: 'graphql', display: 'GraphQL', categoryId: 'backend-development' },
  { id: 'rest-apis', display: 'REST APIs', categoryId: 'backend-development' },
  { id: 'authentication', display: 'Authentication & Authorization', categoryId: 'backend-development' },
  { id: 'microservices', display: 'Microservices', categoryId: 'backend-development' },
  { id: 'serverless', display: 'Serverless', categoryId: 'backend-development' },

  // Artificial Intelligence subcategories
  { id: 'ml-fundamentals', display: 'Machine Learning Fundamentals', categoryId: 'artificial-intelligence' },
  { id: 'deep-learning', display: 'Deep Learning', categoryId: 'artificial-intelligence' },
  { id: 'nlp', display: 'Natural Language Processing (NLP)', categoryId: 'artificial-intelligence' },
  { id: 'computer-vision', display: 'Computer Vision', categoryId: 'artificial-intelligence' },
  { id: 'neural-networks', display: 'Neural Networks', categoryId: 'artificial-intelligence' },
  { id: 'llms', display: 'Large Language Models (LLMs)', categoryId: 'artificial-intelligence' },
  { id: 'transformers', display: 'Transformers', categoryId: 'artificial-intelligence' },
  { id: 'data-science', display: 'Data Science', categoryId: 'artificial-intelligence' },
  { id: 'model-training', display: 'Model Training & Optimization', categoryId: 'artificial-intelligence' },
  { id: 'ai-ethics', display: 'AI Ethics', categoryId: 'artificial-intelligence' },
  { id: 'reinforcement-learning', display: 'Reinforcement Learning', categoryId: 'artificial-intelligence' },

  // Systems Design subcategories
  { id: 'scalability-patterns', display: 'Scalability Patterns', categoryId: 'systems-design' },
  { id: 'database-architecture', display: 'Database Architecture', categoryId: 'systems-design' },
  { id: 'caching-strategies', display: 'Caching Strategies', categoryId: 'systems-design' },
  { id: 'load-balancing', display: 'Load Balancing', categoryId: 'systems-design' },
  { id: 'distributed-systems', display: 'Distributed Systems', categoryId: 'systems-design' },
  { id: 'microservices-architecture', display: 'Microservices Architecture', categoryId: 'systems-design' },
  { id: 'api-design', display: 'API Design', categoryId: 'systems-design' },
  { id: 'message-queues', display: 'Message Queues', categoryId: 'systems-design' },
  { id: 'cdn-edge', display: 'CDN & Edge Computing', categoryId: 'systems-design' },
  { id: 'system-security', display: 'System Security', categoryId: 'systems-design' },
  { id: 'high-availability', display: 'High Availability', categoryId: 'systems-design' },
  { id: 'monitoring-observability', display: 'Monitoring & Observability', categoryId: 'systems-design' },

  // Databases subcategories
  { id: 'sql', display: 'SQL (PostgreSQL, MySQL)', categoryId: 'databases' },
  { id: 'mongodb', display: 'MongoDB', categoryId: 'databases' },
  { id: 'redis', display: 'Redis', categoryId: 'databases' },
  { id: 'database-indexing', display: 'Database Indexing', categoryId: 'databases' },
  { id: 'query-optimization', display: 'Query Optimization', categoryId: 'databases' },
  { id: 'transactions-acid', display: 'Transactions & ACID', categoryId: 'databases' },
  { id: 'nosql-design', display: 'NoSQL Design', categoryId: 'databases' },
  { id: 'database-sharding', display: 'Database Sharding', categoryId: 'databases' },

  // DevOps & Cloud subcategories
  { id: 'docker', display: 'Docker', categoryId: 'devops-cloud' },
  { id: 'kubernetes', display: 'Kubernetes', categoryId: 'devops-cloud' },
  { id: 'aws', display: 'AWS', categoryId: 'devops-cloud' },
  { id: 'azure', display: 'Azure', categoryId: 'devops-cloud' },
  { id: 'cicd', display: 'CI/CD', categoryId: 'devops-cloud' },
  { id: 'infrastructure-as-code', display: 'Infrastructure as Code', categoryId: 'devops-cloud' },
  { id: 'monitoring-logging', display: 'Monitoring & Logging', categoryId: 'devops-cloud' },
  { id: 'git-version-control', display: 'Git & Version Control', categoryId: 'devops-cloud' },

  // Data Structures & Algorithms subcategories
  { id: 'arrays-strings', display: 'Arrays & Strings', categoryId: 'data-structures-algorithms' },
  { id: 'linked-lists', display: 'Linked Lists', categoryId: 'data-structures-algorithms' },
  { id: 'trees-graphs', display: 'Trees & Graphs', categoryId: 'data-structures-algorithms' },
  { id: 'dynamic-programming', display: 'Dynamic Programming', categoryId: 'data-structures-algorithms' },
  { id: 'sorting-searching', display: 'Sorting & Searching', categoryId: 'data-structures-algorithms' },
  { id: 'hash-tables', display: 'Hash Tables', categoryId: 'data-structures-algorithms' },
  { id: 'recursion', display: 'Recursion', categoryId: 'data-structures-algorithms' },
  { id: 'big-o-notation', display: 'Big O Notation', categoryId: 'data-structures-algorithms' },
];

// Helper function to get subcategories for a specific category
export const getSubcategoriesByCategory = (categoryId: string): SubcategoryOption[] => {
  return SUBCATEGORIES.filter(sub => sub.categoryId === categoryId);
};

// Helper function to get category display name by id
export const getCategoryDisplay = (categoryId: string): string => {
  return CATEGORIES.find(cat => cat.id === categoryId)?.display || categoryId;
};

// Helper function to get subcategory display name by id
export const getSubcategoryDisplay = (subcategoryId: string): string => {
  return SUBCATEGORIES.find(sub => sub.id === subcategoryId)?.display || subcategoryId;
};

// Helper function to get category by id
export const getCategoryById = (categoryId: string): CategoryOption | undefined => {
  return CATEGORIES.find(cat => cat.id === categoryId);
};

// Helper function to get subcategory by id
export const getSubcategoryById = (subcategoryId: string): SubcategoryOption | undefined => {
  return SUBCATEGORIES.find(sub => sub.id === subcategoryId);
};

// Default values
export const DEFAULT_NUM_QUESTIONS = 5;
export const MIN_QUESTIONS = 3;
export const MAX_QUESTIONS = 10;
