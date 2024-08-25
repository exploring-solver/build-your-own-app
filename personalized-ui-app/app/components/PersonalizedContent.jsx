import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@react-native-material/core';

export default function PersonalizedContent({ content }) {
  if (!content) {
    return <Text>Loading personalized content...</Text>;
  }

  return (
    <View>
      <Text variant="h6" style={styles.contentTitle}>{content.title}</Text>
      <Text>{content.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentTitle: {
    marginBottom: 8,
    color: '#673AB7',
  },
});