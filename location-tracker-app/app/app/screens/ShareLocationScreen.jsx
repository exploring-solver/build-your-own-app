import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import io from 'socket.io-client';
import { Surface, Text } from "@react-native-material/core";

export default function ShareLocationScreen({ route }) {
  const { userId, trackUserId } = route.params;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let locationSubscription;
    const socket = io('http://192.168.1.3:3000');

    const startLocationTracking = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation.coords);
          sendLocationUpdate(newLocation.coords);
        }
      );
    };

    const sendLocationUpdate = async (coords) => {
      try {
        await axios.post('http://192.168.1.3:3000/location', {
          userId,
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      } catch (error) {
        console.error('Failed to send location update:', error);
      }
    };

    if (userId) {
      startLocationTracking();
    }

    if (trackUserId) {
      socket.on('locationUpdate', (data) => {
        if (data.userId === trackUserId) {
          setLocation({ latitude: data.latitude, longitude: data.longitude });
        }
      });
    }

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
      socket.disconnect();
    };
  }, [userId, trackUserId]);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <Surface style={styles.container} elevation={4}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});