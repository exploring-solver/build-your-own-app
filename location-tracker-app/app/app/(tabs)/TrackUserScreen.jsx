import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function TrackUserScreen() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetchUsers();

    socket.on('locationUpdate', (data) => {
      if (data.userId === selectedUser) {
        setUserLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    });

    return () => {
      socket.off('locationUpdate');
    };
  }, [selectedUser]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000api/auth/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const startTracking = (userId) => {
    setSelectedUser(userId);
    socket.emit('startTracking', { userId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => startTracking(item._id)}
          >
            <Text>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
      {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            ...userLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={userLocation} title="User Location" />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  map: {
    flex: 1,
    marginTop: 20,
  },
});