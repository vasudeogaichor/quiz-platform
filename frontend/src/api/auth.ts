import apiClient from '@/api/axiosInstance';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/api/auth/login', { email, password });
  return response.data;
};

export const signup = async (userData: { name: string; email: string; password: string }) => {
  const response = await apiClient.post('/api/auth/signup', userData);
  return response.data;
};