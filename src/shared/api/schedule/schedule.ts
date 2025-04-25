import { CreateScheduleDto, ScheduleEvent, ScheduleResponse } from '../../types/schedule'
import { apiWithTokenAndCenter } from '../api'
import { AxiosResponse } from 'axios'

export const $getSchedule = async (
  start_date: string,
  end_date: string
): Promise<AxiosResponse<ScheduleResponse>> => {
  const response = await apiWithTokenAndCenter.get<ScheduleResponse>(
    `/partners/schedules/?start_date=${start_date}&end_date=${end_date}`
  )
  return response
}
export const $createSchedule = async (
  data: CreateScheduleDto
): Promise<AxiosResponse<ScheduleEvent>> => {
  const response = await apiWithTokenAndCenter.post<ScheduleEvent>('/partners/schedules/', data)
  return response
}
