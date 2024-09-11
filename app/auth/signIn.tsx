import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { z } from 'zod';

import Container from '@/components/Container';
import { API_BASE_URL } from '@/config';
import AuthButton from '@/components/AuthButton';
import { useSession } from '@/context/authContext';

const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string()
});

interface SignInFormData {
  email: string;
  password: string;
}

interface ApiResponse {
  message?: string;
}

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const {signIn} = useSession();

  const onSubmit = async (data: SignInFormData): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData: ApiResponse = await response.json();
        Alert.alert('Error', errorData.message || 'Something went wrong');
        return;
      }

      Alert.alert('Success', 'Signed in successfully');
      signIn();
      router.replace('/')
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in');
    }
  };

  return (
    <Container>
      <Text style={styles.title}>Sign In</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="johndoe@gmail.com"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
      />
      {errors.email && <Text style={styles.errorText}>{String(errors.email.message)}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="eadZkfs@*"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          </View>
        )}
      />
      {errors.password && <Text style={styles.errorText}>{String(errors.password.message)}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/auth/signUp')}>
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    marginVertical: 10,
    padding: 15,
    width: '80%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'left',
    width: '80%'
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10
  },
  inputContainer: {
    marginVertical: 10,
    width: '80%'
  },
  label: {
    color: '#333',
    fontSize: 16,
    marginBottom: 5
  },
  signUpText: {
    color: 'blue',
    marginTop: 20,
    textDecorationLine: 'underline'
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  }
});