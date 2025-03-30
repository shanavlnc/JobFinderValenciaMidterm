import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Job } from '../api/jobsApi';
import { useTheme } from '../context/ThemeContext';

type JobCardProps = {
  job: Job;
  onSave?: () => void;
  onRemove?: () => void;
  onApply: () => void;
  isSaved: boolean;
};

const JobCard: React.FC<JobCardProps> = ({ job, onSave, onRemove, onApply, isSaved }) => {
  const { theme } = useTheme();

  const handleSavePress = () => {
    if (isSaved && onRemove) {
      onRemove();
    } else if (!isSaved && onSave) {
      onSave();
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        {job.companyLogo && (
          <Image source={{ uri: job.companyLogo }} style={styles.logo} />
        )}
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{job.title}</Text>
          <Text style={[styles.company, { color: theme.colors.text }]}>{job.companyName}</Text>
        </View>
      </View>

      {job.salary && (
        <Text style={[styles.detail, { color: theme.colors.text }]}>💰 Salary: {job.salary}</Text>
      )}

      {job.locations && job.locations.length > 0 && (
        <Text style={[styles.detail, { color: theme.colors.text }]}>
          📍 Locations: {job.locations.join(', ')}
        </Text>
      )}

      {job.jobType && (
        <Text style={[styles.detail, { color: theme.colors.text }]}>🕒 {job.jobType}</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { 
              backgroundColor: isSaved ? theme.colors.primary : '#2ecc71',
              opacity: isSaved ? 0.8 : 1
            }
          ]}
          onPress={handleSavePress}
        >
          <Text style={styles.buttonText}>
            {isSaved ? '✓ Saved' : 'Save'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={onApply}
        >
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    opacity: 0.8,
  },
  detail: {
    marginBottom: 8,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default JobCard;