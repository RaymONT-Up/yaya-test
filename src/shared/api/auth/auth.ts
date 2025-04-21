import { LoginRequest, LoginResponse } from "../../types/auth";
import { apiClient } from "../api";

export const $login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/partners/login/', data);
  return response.data;
};