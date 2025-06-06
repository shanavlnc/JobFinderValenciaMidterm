import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useJobs } from '../context/JobsContext';
import { useTheme } from '../context/ThemeContext';
import SavedJobCard from '../components/SavedJobCard';
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
          <SavedJobCard
            job={item}
            onRemove={() => removeJob(item.id)}
            onApply={() => handleApply(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            No saved jobs
          </Text>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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

export default SavedJobsScreen;