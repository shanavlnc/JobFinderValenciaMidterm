import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button, View } from 'react-native';
import JobFinderScreen from '../screens/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import ApplicationForm from '../screens/ApplicationForm';
import ThemeToggle from '../components/ThemeToggle';
import { Job } from '../api/jobsApi';

export type RootStackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
  ApplicationForm: { 
    job: Job;
    fromSaved: boolean;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="JobFinder"
          component={JobFinderScreen}
          options={({ navigation }) => ({
            title: 'Job Finder',
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ThemeToggle />
                <Button
                  title="Saved Jobs"
                  onPress={() => navigation.navigate('SavedJobs')}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="SavedJobs"
          component={SavedJobsScreen}
          options={{ title: 'Saved Jobs' }}
        />
        <Stack.Screen
          name="ApplicationForm"
          component={ApplicationForm}
          options={({ route }) => ({
            title: `Apply to ${route.params.job.companyName}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;