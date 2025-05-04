import { AxiosResponse } from 'axios'
import { apiWithTokenAndCenter } from '../api'
import { Trainer } from '../../types/trainer'

export const $getTrainers = async (): Promise<AxiosResponse<Trainer[]>> => {
  const response = await apiWithTokenAndCenter.get<Trainer[]>('/partners/trainers/')
  return response
}
