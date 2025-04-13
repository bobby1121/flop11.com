import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const login = (email, password) => api.post('/api/auth/login', { email, password });
export const register = (userData) => api.post('/api/auth/register', userData);
export const getCurrentUser = () => api.get('/api/auth/me');

// Player API calls
export const getPlayers = () => api.get('/api/players');
export const createPlayer = (playerData) => api.post('/api/players', playerData);
export const updatePlayer = (id, playerData) => api.put(`/api/players/${id}`, playerData);
export const deletePlayer = (id) => api.delete(`/api/players/${id}`);

// Match API calls
export const getMatches = () => api.get('/api/matches');
export const createMatch = (matchData) => api.post('/api/matches', matchData);
export const updateMatch = (id, matchData) => api.put(`/api/matches/${id}`, matchData);
export const deleteMatch = (id) => api.delete(`/api/matches/${id}`);

// Team API calls
export const createTeam = (teamData) => api.post('/api/teams', teamData);
export const getMyTeams = () => api.get('/api/teams/my');
export const getTeam = (id) => api.get(`/api/teams/${id}`);
export const updateTeam = (id, teamData) => api.put(`/api/teams/${id}`, teamData);
export const deleteTeam = (id) => api.delete(`/api/teams/${id}`);

// Leaderboard API calls
export const getLeaderboard = () => api.get('/api/leaderboard');

export default api; 