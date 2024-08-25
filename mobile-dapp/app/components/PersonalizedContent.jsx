import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from '@react-native-material/core';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function PersonalizedContent({ content }) {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(opacity.value),
    };
  });

  React.useEffect(() => {
    opacity.value = 1;
  }, [content]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {content.map((item, index) => (
        <Card key={index} style={styles.card}>
          <Text variant="h6">{item.title}</Text>
          <Text>{item.description}</Text>
        </Card>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
});