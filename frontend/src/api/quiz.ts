import { ApiResponse } from "@/types/api";
import apiClient from "./axiosInstance";

export const getQuestion = async (): Promise<ApiResponse> => {
  const response = await apiClient.get<ApiResponse>("/api/quiz/questions");
  return response.data;
};

export const submitAnswer = async(submitPayload: {
  attemptId?: string,
  questionId?: string,
  answer?: number
}): Promise<ApiResponse> => {
  const response = await apiClient.post<ApiResponse>(
    "/api/quiz/submit-answer",
    submitPayload
  );
  return response.data;
}
