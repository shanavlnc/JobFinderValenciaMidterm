import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useJobs } from '../context/JobsContext';
import { useTheme } from '../context/ThemeContext';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Job } from '../api/jobsApi';

type Props = StackScreenProps<RootStackParamList, 'JobFinder'>;

const JobFinderScreen = ({ navigation }: Props) => {
  const { jobs, savedJobs, loading, refreshJobs, saveJob } = useJobs();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    setFilteredJobs(
      jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    );
  }, [searchQuery, jobs]);  

  const handleApply = (job: Job) => {
    navigation.navigate('ApplicationForm', { job, fromSaved: false });
  };

  if (loading && jobs.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search jobs..."
      />

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSaved = savedJobs.some((savedJob: Job) => savedJob.id === item.id);
          return (
            <JobCard
              job={item}
              isSaved={isSaved}
              onSave={() => saveJob(item)}
              onApply={() => handleApply(item)}
            />
          );
        }}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            {searchQuery ? 'No matching jobs found' : 'No jobs available'}
          </Text>
        }
        refreshing={loading}
        onRefresh={refreshJobs}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default JobFinderScreen;