import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from '@react-native-material/core';
import RecommendationCard from './RecommendationCard';
import { getPersonalizedRecommendations } from '../../services/personalizationEngine';

export default function RecommendationsScreen() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const personalizedRecommendations = await getPersonalizedRecommendations();
      setRecommendations(personalizedRecommendations);
    };

    fetchRecommendations();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="h5" style={styles.title}>Your Recommendations</Text>
      <FlatList
        data={recommendations}
        renderItem={({ item }) => <RecommendationCard recommendation={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
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
});