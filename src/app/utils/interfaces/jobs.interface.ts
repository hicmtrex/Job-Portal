export interface JobTypes {
  id: string;
  title: string;
  companyName: string;
  email: string;
  image: string;
  salary: string;
  website: string;
  category: string;
  location: string;
  jobNature: string;
  description: string;
  applicationDate: string;
  requiredKnowledge: string[];
  experience: string[];
  apply: any[];
  createdAt: Date;
}

export interface FilterJob {
  page?: number;
  category?: string;
  search?: string;
  location?: string;
  jobNature?: string;
}
