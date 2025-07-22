export type EmploymentType = 'Full-time' | 'Part-time' | 'Internship';

export interface JobPostFormData {
  title: string;
  department: string;
  employmentType: EmploymentType;
  description: string;
  location: string;
  deadline: string;
}

export interface JobPost extends JobPostFormData {
  id: number;
  createdAt: string;
}