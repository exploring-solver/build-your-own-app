import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from '@react-native-material/core';
import { MotiView } from 'moti';
import PersonalizedContent from '../components/PersonalizedContent';
import { getPersonalizedContent } from '../../services/personalizationEngine';

export default function HomeScreen() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchPersonalizedContent = async () => {
      const personalizedContent = await getPersonalizedContent();
      setContent(personalizedContent);
    };

    fetchPersonalizedContent();
  }, []);

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
      >
        <Surface elevation={2} category="medium" style={styles.surface}>
          <Text variant="h5" style={styles.title}>Welcome to Your Personalized Experience</Text>
          <PersonalizedContent content={content} />
        </Surface>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3E5F5',
  },
  surface: {
    padding: 16,
    borderRadius: 8,
  },
  title: {
    marginBottom: 16,
    color: '#673AB7',
  },
});