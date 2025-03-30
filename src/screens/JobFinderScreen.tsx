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
  const { jobs, loading, refreshJobs, saveJob } = useJobs();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    setFilteredJobs(
      jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) // Fixed toLowerCase() typo
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
        renderItem={({ item }) => (
          <JobCard
                job={item}
                onSave={() => saveJob(item)}
                onApply={() => handleApply(item)}
                isSaved={false} onRemove={function (): void {
                    throw new Error('Function not implemented.');
                } }          />
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            {searchQuery ? 'No matching jobs found' : 'No jobs available'}
          </Text>
        }
        refreshing={loading}
        onRefresh={refreshJobs}
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

export default JobFinderScreen;