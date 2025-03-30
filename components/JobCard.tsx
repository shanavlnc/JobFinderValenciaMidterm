// src/components/JobCard.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Job } from '../types/job.d';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onSave: () => void;
  onApply: () => void;
  theme: {
    card: string;
    primary: string;
    text: string;
    accent: string;
  };
}

const JobCard = ({ job, isSaved, onSave, onApply, theme }: JobCardProps) => {
  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.primary }]}>{job.title}</Text>
        <Text style={[styles.company, { color: theme.text }]}>{job.company}</Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={[styles.detailPill, { backgroundColor: `${theme.primary}20` }]}>
          <Text style={[styles.detailText, { color: theme.primary }]}>{job.type}</Text>
        </View>
        <Text style={[styles.detailText, { color: theme.text }]}>{job.location}</Text>
      </View>

      <Text style={[styles.salary, { color: theme.text }]}>{job.salary}</Text>

      {job.description && (
        <Text 
          style={[styles.description, { color: theme.text }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {job.description}
        </Text>
      )}

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={onSave}
          style={[
            styles.button,
            styles.saveButton,
            {
              backgroundColor: isSaved ? theme.accent : 'transparent',
              borderColor: theme.accent
            }
          ]}
        >
          <Text style={{ color: isSaved ? 'white' : theme.accent }}>
            {isSaved ? 'Saved' : 'Save Job'}
          </Text>
        </Pressable>

        <Pressable
          onPress={onApply}
          style={[
            styles.button,
            {
              backgroundColor: theme.primary
            }
          ]}
        >
          <Text style={{ color: 'white' }}>Apply Now</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  header: {
    marginBottom: 8
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4
  },
  company: {
    fontSize: 14,
    opacity: 0.8
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 12
  },
  detailPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  detailText: {
    fontSize: 12
  },
  salary: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.8,
    marginBottom: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveButton: {
    borderWidth: 1
  }
});

export default JobCard;