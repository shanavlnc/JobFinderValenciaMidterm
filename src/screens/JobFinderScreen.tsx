import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useJobs } from '../context/JobsContext';
import { useTheme } from '../context/ThemeContext';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import ThemeToggle from '../components/ThemeToggle';
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
        renderItem={({ item }) => (
          <JobCard
            job={item}
            isSaved={false}
            onSave={() => saveJob(item)}
            onRemove={() => {}}
            onApply={() => handleApply(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            {searchQuery ? 'No matching jobs found' : 'No jobs available'}
          </Text>
        }
        refreshing={loading}
        onRefresh={refreshJobs}
        contentContainerStyle={styles.listContent}
      />

      {/* Footer with Theme Toggle and Saved Jobs link */}
      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <ThemeToggle />
        <TouchableOpacity 
          onPress={() => navigation.navigate('SavedJobs')}
          style={styles.savedJobsButton}
        >
          <Text style={[styles.footerText, { color: theme.colors.primary }]}>
            Saved Jobs
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80, // Space for footer
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  savedJobsButton: {
    padding: 8,
  },
});

export default JobFinderScreen;