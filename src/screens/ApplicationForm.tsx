import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { validateEmail, validatePhone } from '../utils/validation';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<RootStackParamList, 'ApplicationForm'>;

const ApplicationForm = ({ route, navigation }: Props) => {
  const { job, fromSaved } = route.params;
  const { theme } = useTheme();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
  });

  const handleSubmit = () => {
    const newErrors = {
      name: form.name ? '' : 'Name is required',
      email: validateEmail(form.email) ? '' : 'Invalid email',
      phone: validatePhone(form.phone) ? '' : 'Invalid phone number',
      reason: form.reason ? '' : 'Please provide a reason',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) return;

    Alert.alert(
      'Application Submitted',
      `Your application for ${job.title} at ${job.companyName} has been submitted successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setForm({
              name: '',
              email: '',
              phone: '',
              reason: '',
            });
            if (fromSaved) {
              navigation.navigate('JobFinder');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Apply for {job.title}
      </Text>
      
      <TextInput
        style={[
          styles.input, 
          { 
            color: theme.colors.text, 
            borderColor: errors.name ? 'red' : theme.colors.border,
            backgroundColor: theme.colors.card
          }
        ]}
        placeholder="Full Name"
        placeholderTextColor={theme.colors.text}
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

      <TextInput
        style={[
          styles.input, 
          { 
            color: theme.colors.text, 
            borderColor: errors.email ? 'red' : theme.colors.border,
            backgroundColor: theme.colors.card
          }
        ]}
        placeholder="Email"
        placeholderTextColor={theme.colors.text}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <TextInput
        style={[
          styles.input, 
          { 
            color: theme.colors.text, 
            borderColor: errors.phone ? 'red' : theme.colors.border,
            backgroundColor: theme.colors.card
          }
        ]}
        placeholder="Phone Number"
        placeholderTextColor={theme.colors.text}
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(text) => setForm({ ...form, phone: text })}
      />
      {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}

      <TextInput
        style={[
          styles.textArea, 
          { 
            color: theme.colors.text, 
            borderColor: errors.reason ? 'red' : theme.colors.border,
            backgroundColor: theme.colors.card
          }
        ]}
        placeholder="Why should we hire you?"
        placeholderTextColor={theme.colors.text}
        multiline
        numberOfLines={4}
        value={form.reason}
        onChangeText={(text) => setForm({ ...form, reason: text })}
      />
      {errors.reason ? <Text style={styles.error}>{errors.reason}</Text> : null}

      <TouchableOpacity
        style={[
          styles.submitButton,
          { backgroundColor: theme.colors.primary }
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Submit Application</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 15,
    fontSize: 14,
  },
  submitButton: {
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ApplicationForm;