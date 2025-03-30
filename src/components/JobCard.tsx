import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '../api/apiTypes';
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
        <Text style={[styles.salary, { color: theme.colors.text }]}>Salary: {job.salary}</Text>
      )}

      {job.locations && job.locations.length > 0 && (
        <Text style={[styles.location, { color: theme.colors.text }]}>
          Locations: {job.locations.join(', ')}
        </Text>
      )}

      <View style={styles.buttonContainer}>
        {isSaved ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={onRemove}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: onSave ? 'green' : 'gray' }]}
            onPress={onSave}
            disabled={!onSave}
          >
            <Text style={styles.buttonText}>{onSave ? 'Save' : 'Saved'}</Text>
          </TouchableOpacity>
        )}

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
    borderRadius: 8,
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
    marginBottom: 8,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 14,
    opacity: 0.8,
  },
  salary: {
    marginBottom: 4,
  },
  location: {
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default JobCard;