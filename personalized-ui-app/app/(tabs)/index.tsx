import { Image, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from '../navigation/TabNavigator';
import { UserPreferencesProvider } from '../context/UserPreferencesContext';
import theme from '../../constants/theme'
import { ThemeProvider } from '@react-native-material/core';
export default function HomeScreen() {
  return (
    <NavigationContainer independent={true}>
      <TabNavigator />
    </NavigationContainer>
  );
}