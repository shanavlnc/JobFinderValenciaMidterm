
export type Job = {
    id: string;
    title: string;
    companyName: string;
    salary?: string;
    description?: string;
    tags?: string[];
    locations?: string[];
    seniorityLevel?: string;
    workModel?: string;
    jobType?: string;
    companyLogo?: string;
    minSalary?: number;
    maxSalary?: number;
  };
  
  export type ApplicationFormData = {
    name: string;
    email: string;
    phone: string;
    reason: string;
  };