import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from "@react-native-material/core";
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.1.3:5000/api/register', { username, password });
      if (response.data.success) {
        navigation.replace('Home', { userId: response.data.userId });
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h4" style={styles.title}>Register</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F3E5F5',
  },
  title: {
    marginBottom: 20,
    color: '#673AB7',
    alignSelf: 'center',
  },
  input: {
    marginBottom: 15,
  },
});