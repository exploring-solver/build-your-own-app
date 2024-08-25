import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '@react-native-material/core';
import PersonalizedContent from '../components/PersonalizedContent';
import { useUserPreferences } from '../context/UserPreferencesContext';
import { getPersonalizedContent } from '../services/api';

export default function HomeScreen() {
  const [content, setContent] = useState([]);
  const { preferences } = useUserPreferences();

  useEffect(() => {
    fetchPersonalizedContent();
  }, [preferences]);

  const fetchPersonalizedContent = async () => {
    try {
      const personalizedContent = await getPersonalizedContent(preferences);
      setContent(personalizedContent);
    } catch (error) {
      console.error('Error fetching personalized content:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h5">Welcome to Your Personalized Experience</Text>
      <PersonalizedContent content={content} />
      <Button title="Refresh Content" onPress={fetchPersonalizedContent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});