import { Center } from '../../types/center'
import { apiClient } from '../api'
import { AxiosResponse } from 'axios'

export const $getCenters = async (): Promise<AxiosResponse<Center[]>> => {
  const response = await apiClient.get<Center[]>('/partners/centers/')
  return response
}
