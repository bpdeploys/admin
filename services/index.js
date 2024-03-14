import axios from 'axios';

// Setup and Configuration
const BASE_URL = 'https://bp-prod-api.com/api';
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Helper Functions
const getToken = () => localStorage.getItem('token');

const getAuthHeaders = () => {
  const token = getToken();
  if (!token) throw new Error('No token found');
  return { Authorization: `Token ${token}` };
};

// Authentication
export const loginRequest = async (credentials) => {
  try {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while logging in');
  }
};

// Fetch Functions
export const fetchAllLeaguesByVenue = async (selectedVenue) => {
  try {
    const response = await api.get(`/leagues?venue_id=${selectedVenue}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllProviders = async () => {
  try {
    const response = await api.get(`/sport-entities?filter_by=league_provider`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllVenuesByProvider = async (selectedProvider) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.get(`/venues?entity_id=${selectedProvider}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await api.get('/current-user/', { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching user data');
  }
};

export const fetchRefereesByVenue = async (venue, page = 1) => {
  try {
    const response = await api.get(`/referees?venue=${venue}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while getting referees');
  }
};

export const fetchPitchesByVenue = async (venue) => {
  try {
    const response = await api.get(`/pitches?venue_id=${venue}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while getting pitches');
  }
};

export const fetchPitchesByVenueAndFormat = async (venue, format) => {
  try {
    const response = await api.get(
      `/pitches?venue_id=${venue}&pitch_format=${format}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while getting pitches');
  }
};

export const fetchMatchesByLeague = async (league) => {
  try {
    const response = await api.get(
      `/matches?search=true&incomplete=true&league=${league}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while getting matches');
  }
};

export const fetchVenueManagersByVenue = async (venue) => {
  try {
    const response = await api.get(`/venue-managers?venue_id=${venue}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while getting Venue Managers');
  }
};

export const fetchTeamsByLeague = async (league) => {
  try {
    const response = await api.get(`/leagues/${league}/teams/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while getting teams');
  }
};

// Create Functions
export const createLeague = async (league) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.post('/leagues/', league, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the league');
  }
};

export const createProvider = async (provider) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.post('/sport-entities/', provider, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the provider');
  }
};

export const createVenue = async (venue) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.post('/venues/', venue, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the venue');
  }
};

export const createReferee = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.post('/referees/', data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the referee');
  }
};

export const createGeneralOverseer = async (data) => {
  try {
    const response = await api.post('/register/', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the GO');
  }
};

export const createPitch = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.post('/pitches/', data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the pitch');
  }
};

export const createVenueManager = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.post('/venue-managers/', data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the Venue Manager');
  }
};

export const createMatch = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.post('/matches/', data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the match');
  }
};

export const createTeam = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.post('/teams/', data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the team');
  }
};

// Update Functions
export const updateUser = async (id, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.patch(`/users/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while updating the user');
  }
};

export const updatePitch = async (id, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.patch(`/pitches/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while updating the pitch');
  }
};

// Delete Functions
export const deleteLeague = async (id) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.delete(`/leagues/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while deleting the league');
  }
};

export const deleteReferee = async (id) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.delete(`/referees/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while deleting the referee');
  }
};

export const deleteMatch = async (id) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.delete(`/matches/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while deleting the match');
  }
};

export const deleteVm = async (id) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.delete(`/venue-managers/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while deleting venue manager');
  }
};

export const deletePitch = async (id) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.delete(`/pitches/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while deleting the pitch');
  }
};

export const deleteGeneralOverseer = async (id) => {
  try {
    const headers = getAuthHeaders();
    const response = await api.delete(`/general-overseer/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while deleting the pitch');
  }
};
