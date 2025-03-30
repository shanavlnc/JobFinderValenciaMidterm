// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './context/AppContext';
import JobMarketScreen from './screens/JobMarketScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="JobMarket" 
            component={JobMarketScreen}
            options={{ title: 'Job Finder' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;