import {
  CancelScheduleDto,
  CreateScheduleDto,
  EditScheduleDto,
  ScheduleEvent,
  ScheduleResponse
} from '../../types/schedule'
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
export const $updateSchedule = async (
  data: EditScheduleDto
): Promise<AxiosResponse<ScheduleEvent>> => {
  const response = await apiWithTokenAndCenter.patch<ScheduleEvent>(
    `/partners/schedules/${data.id}/edit/`,
    {
      trainer_id: data.trainer_id,
      places: data.places
    },
    {}
  )
  return response
}

export const $cancelSchedule = async (data: CancelScheduleDto): Promise<AxiosResponse<void>> => {
  const response = await apiWithTokenAndCenter.post(`/partners/schedules/${data.id}/cancel/`, {
    cancel_reason: data.cancel_reason
  })
  return response
}
