import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.1.3:5000/api';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_URL}/register`, { username, password });
      console.log(response);
      if (response.data.success) {
        await AsyncStorage.setItem('token', response.data.token);
        navigation.replace('Home', { userId: response.data.userId });
      } else {
        Alert.alert('Registration Failed', 'Please check your details and try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h5" style={styles.title}>Register</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        variant="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        variant="outlined"
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} color="#673AB7" />
      <Button title="Login" onPress={() => navigation.navigate('Login')} variant="text" style={styles.loginButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F3E5F5', // Light violet background
  },
  title: {
    marginBottom: 20,
    color: '#673AB7', // Deep violet for title
    alignSelf: 'center',
  },
  input: {
    marginBottom: 15,
  },
  loginButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
