import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Surface, Text, ListItem } from "@react-native-material/core";
import axios from 'axios';

export default function TrackingScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:3000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
      title={item.username}
      onPress={() => navigation.navigate('ShareLocation', { trackUserId: item._id })}
    />
  );

  return (
    <Surface style={styles.container} elevation={4}>
      <Text variant="h6" style={styles.title}>Users to Track</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    marginBottom: 16,
    color: '#673AB7',
  },
});