import apiClient from "@/api/axiosInstance";
import { ApiResponse } from "@/types/api";

export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post("/api/auth/login", { email, password });
  return response.data;
};

export const signupUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
  grade: number;
}): Promise<ApiResponse> => {
  const response = await apiClient.post<ApiResponse>("/api/auth/signup", userData);
  return response.data;
};
