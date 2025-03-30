import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Job } from '../api/jobsApi';
import { fetchJobs } from '../api/jobsApi';

type JobsContextType = {
  jobs: Job[];
  savedJobs: Job[];
  loading: boolean;
  refreshJobs: () => Promise<void>;
  saveJob: (job: Job) => void;
  removeJob: (jobId: string) => void;
};

const JobsContext = createContext<JobsContextType>({
  jobs: [],
  savedJobs: [],
  loading: false,
  refreshJobs: async () => {},
  saveJob: () => {},
  removeJob: () => {},
});

export const JobsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshJobs = async () => {
    setLoading(true);
    try {
      const fetchedJobs = await fetchJobs();
      setJobs(fetchedJobs);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const saveJob = (job: Job) => {
    setSavedJobs(prev => {
      if (prev.some(j => j.id === job.id)) return prev;
      return [...prev, job];
    });
  };
  
  const removeJob = (jobId: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== jobId));
  };

  return (
    <JobsContext.Provider value={{
      jobs,
      savedJobs,
      loading,
      refreshJobs,
      saveJob,
      removeJob,
    }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);