import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FormGroupProps {
  label: string;
  children: React.ReactNode;
  error?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, children, error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  error: {
    color: 'red',
  },
});

export default FormGroup;
