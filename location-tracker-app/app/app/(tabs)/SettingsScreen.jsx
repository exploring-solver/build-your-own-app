import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [backgroundTracking, setBackgroundTracking] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const value = await AsyncStorage.getItem('backgroundTracking');
      if (value !== null) {
        setBackgroundTracking(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const toggleBackgroundTracking = async (value) => {
    setBackgroundTracking(value);
    try {
      await AsyncStorage.setItem('backgroundTracking', JSON.stringify(value));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Background Tracking</Text>
        <Switch
          value={backgroundTracking}
          onValueChange={toggleBackgroundTracking}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 16,
  },
});