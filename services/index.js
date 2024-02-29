// api.js
import axios from 'axios';

const BASE_URL = 'https://bp-prod-api.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// GET MODEL
export const fetchAllLeaguesByVenue = async (selectedVenue) => {
  try {
    const response = await api.get(`/leagues?venue_id=${selectedVenue}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllVenuesByProvider = async (selectedProvider) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.get(`/venues?entity_id=${selectedProvider}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST MODEL
export const createLeaguess = async (playerProfile) => {
  try {
    const response = await api.post('/leagues/', playerProfile);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the league');
  }
};

// POST MODEL WITH TOKEN
export const createLeague = async (league) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Check if the token exists
    if (!token) {
      throw new Error('No token found');
    }

    // Set up the headers with the Authorization token
    const headers = {
      Authorization: `Token ${token}`,
    };

    // Make the POST request with the headers
    const response = await api.post('/leagues/', league, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the league');
  }
};

export const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await api.get('/current-user/', { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the team');
  }
};

export const loginRequest = async (credentials) => {
  try {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while logging in');
  }
};

export const createReferee = async (data) => {
  try {
    const response = await api.post('/register/', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the referee');
  }
};

export const getReferees = async (credentials) => {
  try {
    const response = await api.get('/referees/2', credentials);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while logging in');
  }
};
