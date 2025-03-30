import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useJobs } from '../context/JobsContext';
import { useTheme } from '../context/ThemeContext';
import JobCard from '../components/JobCard';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Job } from '../api/jobsApi';

type Props = StackScreenProps<RootStackParamList, 'SavedJobs'>;

const SavedJobsScreen = ({ navigation }: Props) => {
  const { savedJobs, removeJob } = useJobs();
  const { theme } = useTheme();

  const handleApply = (job: Job) => {
    navigation.navigate('ApplicationForm', { job, fromSaved: true });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
                job={item}
                onRemove={() => removeJob(item.id)}
                onApply={() => handleApply(item)}
                isSaved={true} onSave={function (): void {
                    throw new Error('Function not implemented.');
                } }          />
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            No saved jobs
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default SavedJobsScreen;