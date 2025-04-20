import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';

import { supabase } from '@/packages/core/utils/supabase';
import AuthLayout from '@/packages/core/components/organisms/AuthLayout';
import Input from '@/packages/core/components/atoms/Input';
import FormGroup from '@/packages/core/components/molecules/FormGroup';

const RegisterScreen = () => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    const { name, email, password } = data;
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      Alert.alert('Ошибка регистрации', authError.message);
      return;
    }

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: authData.user.id,
          name,
          profile_type: 'personal',
          created_at: new Date().toISOString(),
        });

      if (profileError) {
        Alert.alert('Ошибка создания профиля', profileError.message);
      } else {
        router.replace('/(tabs)');
      }
    }
  };

  return (
    <AuthLayout>
      <Text style={styles.title}>Регистрация</Text>

      <FormGroup label="Имя" error={errors.name?.message}>
        <Controller
          control={control}
          rules={{ required: 'Имя обязательно' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
      </FormGroup>

      <FormGroup label="Email" error={errors.email?.message}>
        <Controller
          control={control}
          rules={{
            required: 'Email обязателен',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный email',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
          )}
          name="email"
        />
      </FormGroup>

      <FormGroup label="Пароль" error={errors.password?.message}>
        <Controller
          control={control}
          rules={{
            required: 'Пароль обязателен',
            minLength: {
              value: 6,
              message: 'Пароль должен быть не менее 6 символов',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
          name="password"
        />
      </FormGroup>

      <Button title="Зарегистрироваться" onPress={handleSubmit(onSubmit)} />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default RegisterScreen;
