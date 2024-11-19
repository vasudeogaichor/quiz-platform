import apiClient from '@/api/axiosInstance';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/api/auth/login', { email, password });
  return response.data;
};

export const signup = async (userData: { fullName: string; email: string; password: string, grade: number }) => {
  const response = await apiClient.post('/api/auth/signup', userData);
  return response.data;
};