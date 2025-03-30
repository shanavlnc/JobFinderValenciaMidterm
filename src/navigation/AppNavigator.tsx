import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, TouchableOpacity, Text } from 'react-native';
import JobFinderScreen from '../screens/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import ApplicationForm from '../screens/ApplicationForm';
import ThemeToggle from '../components/ThemeToggle';
import { Job } from '../api/jobsApi';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="JobFinder"
          component={JobFinderScreen}
          options={({ navigation }) => ({
            headerTitle: () => (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.text }}>
                  JobFinder
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 4 }}>
                  <ThemeToggle />
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('SavedJobs')}
                    style={{ marginLeft: 15 }}
                  >
                    <Text style={{ color: theme.colors.primary }}>Saved Jobs</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ),
            headerTitleAlign: 'center',
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