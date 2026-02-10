export interface CategoryOption {
  id: string;
  display: string;
}

export interface SubcategoryOption {
  id: string;
  display: string;
  categoryId: string;
}

// Hardcoded categories with id and display mapping
export const CATEGORIES: CategoryOption[] = [
  { id: 'programming', display: 'Programming' },
  { id: 'web-development', display: 'Web Development' },
  { id: 'data-science', display: 'Data Science' },
  { id: 'cloud-computing', display: 'Cloud Computing' },
  { id: 'databases', display: 'Databases' },
];

// Hardcoded subcategories with parent category reference
export const SUBCATEGORIES: SubcategoryOption[] = [
  // Programming subcategories
  { id: 'javascript', display: 'JavaScript', categoryId: 'programming' },
  { id: 'python', display: 'Python', categoryId: 'programming' },
  { id: 'java', display: 'Java', categoryId: 'programming' },
  { id: 'typescript', display: 'TypeScript', categoryId: 'programming' },
  { id: 'cpp', display: 'C++', categoryId: 'programming' },
  
  // Web Development subcategories
  { id: 'react', display: 'React', categoryId: 'web-development' },
  { id: 'vue', display: 'Vue.js', categoryId: 'web-development' },
  { id: 'angular', display: 'Angular', categoryId: 'web-development' },
  { id: 'nextjs', display: 'Next.js', categoryId: 'web-development' },
  { id: 'nodejs', display: 'Node.js', categoryId: 'web-development' },
  
  // Data Science subcategories
  { id: 'machine-learning', display: 'Machine Learning', categoryId: 'data-science' },
  { id: 'deep-learning', display: 'Deep Learning', categoryId: 'data-science' },
  { id: 'data-analysis', display: 'Data Analysis', categoryId: 'data-science' },
  { id: 'statistics', display: 'Statistics', categoryId: 'data-science' },
  
  // Cloud Computing subcategories
  { id: 'aws', display: 'AWS', categoryId: 'cloud-computing' },
  { id: 'azure', display: 'Azure', categoryId: 'cloud-computing' },
  { id: 'gcp', display: 'Google Cloud Platform', categoryId: 'cloud-computing' },
  { id: 'docker', display: 'Docker', categoryId: 'cloud-computing' },
  { id: 'kubernetes', display: 'Kubernetes', categoryId: 'cloud-computing' },
  
  // Databases subcategories
  { id: 'sql', display: 'SQL', categoryId: 'databases' },
  { id: 'mongodb', display: 'MongoDB', categoryId: 'databases' },
  { id: 'postgresql', display: 'PostgreSQL', categoryId: 'databases' },
  { id: 'redis', display: 'Redis', categoryId: 'databases' },
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

// Default values
export const DEFAULT_NUM_QUESTIONS = 5;
export const MIN_QUESTIONS = 3;
export const MAX_QUESTIONS = 10;
