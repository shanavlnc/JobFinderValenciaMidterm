import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '../api/jobsApi';
import { useTheme } from '../context/ThemeContext';

type JobCardProps = {
    job: Job;
    isSaved: boolean;
    onSave: () => void;
    onApply: () => void;
  };
  
  const JobCard: React.FC<JobCardProps> = ({ job, isSaved, onSave, onApply }) => {
    const { theme } = useTheme();
  
    return (
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        {/* Header and details remain the same */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { 
                backgroundColor: isSaved ? '#2E7D32' : theme.colors.primary,
              }
            ]}
            onPress={onSave}
            disabled={isSaved}
          >
            <Text style={styles.buttonText}>
              {isSaved ? 'Saved ✓' : 'Save'}
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={onApply}
          >
            <Text style={styles.buttonText}>Apply Now</Text>
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
  details: {
    marginVertical: 8,
  },
  detail: {
    marginBottom: 6,
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