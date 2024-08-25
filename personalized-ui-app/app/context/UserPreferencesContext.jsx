import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserPreferencesContext = createContext();

export const UserPreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const storedPreferences = await AsyncStorage.getItem('userPreferences');
      if (storedPreferences) {
        setPreferences(JSON.parse(storedPreferences));
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const updatePreferences = async (newPreferences) => {
    try {
      const updatedPreferences = { ...preferences, ...newPreferences };
      await AsyncStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
      setPreferences(updatedPreferences);
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => useContext(UserPreferencesContext);