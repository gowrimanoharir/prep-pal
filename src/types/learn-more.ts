export interface Resource {
  title: string;
  url: string;
  description: string;
  type: 'docs' | 'tutorial' | 'video' | 'article' | 'practice';
}

export interface LearnMoreSuccessData {
  summary: string;
  resources: Resource[];
}
