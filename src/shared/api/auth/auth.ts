import { AxiosResponse } from 'axios'
import { LoginRequest, LoginResponse } from '../../types/auth'
import { apiClient, apiWithouToken } from '../api'

export const $login = async (data: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
  const response = await apiWithouToken.post<LoginResponse>('/partners/login/', data)
  return response
}
export const $logout = async (): Promise<AxiosResponse<LoginResponse>> => {
  const response = await apiClient.post<LoginResponse>('/partners/logout/')
  return response
}
