import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getPersonalizedContent = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/personalized-content/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch personalized content:', error);
    return null;
  }
};

export const getPersonalizedRecommendations = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/recommendations/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recommendations:', error);
    return [];
  }
};

export const updateUserPreferences = async (userId, interests, recentInteractions) => {
  try {
    await axios.post(`${API_URL}/user/preferences`, { userId, interests, recentInteractions });
  } catch (error) {
    console.error('Failed to update user preferences:', error);
  }
};