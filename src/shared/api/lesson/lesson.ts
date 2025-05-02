import { AxiosResponse } from 'axios'
import { apiWithTokenAndCenter } from '../api'
import { Lesson } from '../../types/lesson'

export const $getLessons = async (): Promise<AxiosResponse<Lesson[]>> => {
  const response = await apiWithTokenAndCenter.get<Lesson[]>('/partners/lessons/')
  return response
}
