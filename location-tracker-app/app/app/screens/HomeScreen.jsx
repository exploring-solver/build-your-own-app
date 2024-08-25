import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

// Define your custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7C4DFF', // Violet color
    background: '#FFFFFF', // White background
    surface: '#F3E5F5', // Light violet for surface
    text: '#4A148C', // Deep violet for text
    accent: '#EDE7F6', // Soft violet accent
  },
};

export default function HomeScreen({ navigation, route }) {
  const { userId } = route.params;

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Tracking', { userId })}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Start Tracking
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('ShareLocation', { userId })}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Share Location
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background
    padding: 20,
  },
  button: {
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#7C4DFF', // Violet button
  },
  buttonText: {
    color: '#FFFFFF', // White text inside the button
  },
});
