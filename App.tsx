import React from 'react';
import { JobsProvider } from './src/context/JobsContext';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <ThemeProvider>
      <JobsProvider>
        <AppNavigator />
      </JobsProvider>
    </ThemeProvider>
  );
};

export default App;