// src/screens/JobMarketScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  ActivityIndicator, 
  RefreshControl, 
  Text, 
  StyleSheet 
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import { fetchJobs } from '../utils/api';
import JobCard from '../components/JobCard';
import SearchHeader from '../components/SearchHeader';
import { Job } from '../types/job.d';

interface JobMarketScreenProps {
  navigation: {
    navigate: (screen: string, params?: { job: Job }) => void;
  };
}

interface SearchHeaderProps {
  value: string;
  onChangeText: (text: string) => void;
  theme: {
    card: string;
    text: string;
    borderColor?: string;
  };
}

const JobMarketScreen = ({ navigation }: JobMarketScreenProps) => {
  const { theme, savedJobs, toggleSavedJob } = useAppContext();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadJobs = async () => {
    try {
      setRefreshing(true);
      const data = await fetchJobs();
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(
        jobs.filter(
          job =>
            job.title.toLowerCase().includes(text.toLowerCase()) ||
            job.company.toLowerCase().includes(text.toLowerCase()) ||
            job.type.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadJobs();
  };

  if (loading && !refreshing) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SearchHeader 
        value={searchQuery}
        onChangeText={handleSearch}
        theme={theme}
      />

      <FlatList
        data={filteredJobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            isSaved={savedJobs.includes(item.id)}
            onSave={() => toggleSavedJob(item.id)}
            onApply={() => navigation.navigate('Application', { job: item })}
            theme={theme}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              {searchQuery ? 'No matching jobs found' : 'No jobs available'}
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContent: {
    paddingBottom: 20
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.6
  }
});

export default JobMarketScreen;