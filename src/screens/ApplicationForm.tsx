import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
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
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Full Name"
        placeholderTextColor={theme.colors.text}
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Email"
        placeholderTextColor={theme.colors.text}
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Phone Number"
        placeholderTextColor={theme.colors.text}
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(text) => setForm({ ...form, phone: text })}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <TextInput
        style={[styles.textArea, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Why should we hire you?"
        placeholderTextColor={theme.colors.text}
        multiline
        numberOfLines={4}
        value={form.reason}
        onChangeText={(text) => setForm({ ...form, reason: text })}
      />
      {errors.reason && <Text style={styles.error}>{errors.reason}</Text>}

      <Button
        title="Submit Application"
        onPress={handleSubmit}
        color={theme.colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ApplicationForm;