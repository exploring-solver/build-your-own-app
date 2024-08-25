import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getPersonalizedContent = async (preferences) => {
  try {
    const response = await axios.post(`${API_URL}/recommendations`, { preferences });
    return response.data;
  } catch (error) {
    console.error('Error fetching personalized content:', error);
    throw error;
  }
};

export const updateUserPreferences = async (userId, preferences) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}/preferences`, { preferences });
    return response.data;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};