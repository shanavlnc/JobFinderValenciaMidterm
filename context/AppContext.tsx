// src/context/AppContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { Job } from '../types/job.d';

interface AppContextType {
  theme: any;
  savedJobs: string[];
  toggleSavedJob: (id: string) => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    background: isDarkMode ? '#121212' : '#F9FAFB',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#121212',
    primary: '#6C63FF',
    accent: '#FF6584'
  };

  const toggleSavedJob = (id: string) => {
    setSavedJobs(prev => 
      prev.includes(id) 
        ? prev.filter(jobId => jobId !== id) 
        : [...prev, id]
    );
  };

  return (
    <AppContext.Provider value={{ theme, savedJobs, toggleSavedJob }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);