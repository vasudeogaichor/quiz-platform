import { ApiResponse } from "@/types/api";
import apiClient from "./axiosInstance";
import { profileUpdateData } from "@/types/profile";

export const getUserProfile = async (): Promise<ApiResponse> => {
  const response = await apiClient.get<ApiResponse>("/api/user/profile");
  return response.data;
};

export const updateUserProfile = async (updateData: profileUpdateData): Promise<ApiResponse> => {
  const response = await apiClient.put<ApiResponse>(
    "/api/user/profile",
    updateData
  );
  console.log("response - ", response);
  return response.data;
};
