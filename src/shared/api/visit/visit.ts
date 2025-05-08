import { CancelVisitDto, IVisit } from '../../types/visit'
import { apiWithTokenAndCenter } from '../api'
import { AxiosResponse } from 'axios'

// date format "YYYY-MM-DD"
export const $getVisits = async (
  date?: string,
  lesson_ids?: number[]
): Promise<AxiosResponse<IVisit[]>> => {
  const response = await apiWithTokenAndCenter.get<IVisit[]>(`/partners/visits/`, {
    params: {
      date,
      lesson_ids
    }
  })
  return response
}
// Отмена одного конкретного посещения
export const $cancelSchedule = async (data: CancelVisitDto): Promise<AxiosResponse<IVisit>> => {
  const response = await apiWithTokenAndCenter.post(`/partners/visits/cancel/`, data)
  return response
}
