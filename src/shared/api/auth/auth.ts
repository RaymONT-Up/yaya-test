import { AxiosResponse } from 'axios'
import { LoginRequest, LoginResponse } from '../../types/auth'
import { apiWithouToken } from '../api'

export const $login = async (data: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
  const response = await apiWithouToken.post<LoginResponse>('/partners/login/', data)
  return response
}
