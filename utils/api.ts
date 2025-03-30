import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://empllo.com/api/v1'; // Double-check this URL

export interface Job {
  id: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  type: string;
  description?: string;
}

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data?.jobs || response.data; // Handles both formats
    
    return data.map((job: any) => ({
      id: job.id || uuidv4(),
      title: job.title || 'Position Available',
      company: job.companyName || job.company || 'Company Confidential',
      salary: job.salary ? `$${job.minSalary}-${job.maxSalary}` : 'Competitive Pay',
      location: job.locations?.[0] || 'Remote',
      type: job.jobType || 'Full-time',
      description: job.description || ''
    }));
  } catch (error) {
    console.error('API fetch failed:', error);
    return []; // Returns empty array if API fails
  }
};