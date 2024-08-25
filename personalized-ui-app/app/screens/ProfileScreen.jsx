import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.1.3:5000/api';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [interests, setInterests] = useState('');
  const [recentInteractions, setRecentInteractions] = useState('');

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_URL}/user`, {
        headers: { 'x-auth-token': token }
      });
      setUser(response.data);
      setInterests(response.data.interests.join(', '));
      setRecentInteractions(response.data.recentInteractions.join(', '));
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleUpdatePreferences = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(`${API_URL}/user/preferences`, {
        interests: interests.split(',').map(i => i.trim()),
        recentInteractions: recentInteractions.split(',').map(i => i.trim())
      }, {
        headers: { 'x-auth-token': token }
      });
      alert('Preferences updated successfully!');
    } catch (error) {
      console.error('Failed to update preferences:', error);
      alert('Failed to update preferences');
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text variant="h5" style={styles.title}>Profile</Text>
      <Text>Username: {user.username}</Text>
      <TextInput
        label="Interests (comma-separated)"
        value={interests}
        onChangeText={setInterests}
        style={styles.input}
      />
      <TextInput
        label="Recent Interactions (comma-separated)"
        value={recentInteractions}
        onChangeText={setRecentInteractions}
        style={styles.input}
      />
      <Button title="Update Preferences" onPress={handleUpdatePreferences} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3E5F5',
  },
  title: {
    marginBottom: 16,
    color: '#673AB7',
  },
  input: {
    marginBottom: 16,
  },
});