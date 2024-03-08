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

export const createProvider = async (provider) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await api.post('/sport-entities/', provider, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the provider');
  }
};

export const createVenue = async (venue) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await api.post('/venues/', venue, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the venue');
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
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.post('/referees/', data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the referee');
  }
};

export const updateUser = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.patch(`/users/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the user');
  }
};

export const getRefereesByVenue = async (venue) => {
  try {
    const response = await api.get(`/referees?venue=${venue}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while getting referees');
  }
};

export const createPitch = async (data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.post('/pitches/', data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the Pitch');
  }
};

export const updatePitch = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.patch(`/pitches/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('An error occurred while creating the Pitch');
  }
};

export const getPitchesByVenue = async (venue) => {
  try {
    const response = await api.get(`/pitches?venue_id=${venue}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while getting pitches');
  }
};

export const getPitchesByVenueAndFormat = async (venue, format) => {
  try {
    const response = await api.get(`/pitches?venue_id=1&format=${format}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while getting pitches');
  }
};

export const getMatchesByLeague = async (league) => {
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

export const createVenueManager = async (data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.post('/venue-managers/', data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the Venue Manager');
  }
};

export const getVenueManagersByVenue = async (venue) => {
  try {
    const response = await api.get(`/venue-managers?venue_id=${venue}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while getting VMs');
  }
};

export const createMatch = async (data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.post('/matches/', data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the match');
  }
};

export const createTeam = async (data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.post('/teams/', data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the team');
  }
};

export const getTeamsByLeague = async (league) => {
  try {
    const response = await api.get(`/leagues/${league}/teams/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while getting teams data');
  }
};
