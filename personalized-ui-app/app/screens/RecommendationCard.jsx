import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from '@react-native-material/core';
import { MotiView } from 'moti';

export default function RecommendationCard({ recommendation }) {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 300 }}
    >
      <Surface elevation={2} category="medium" style={styles.card}>
        <Text variant="h6" style={styles.title}>{recommendation.title}</Text>
        <Text>{recommendation.description}</Text>
      </Surface>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    marginBottom: 8,
    color: '#673AB7',
  },
});