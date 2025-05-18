import {
  CancelScheduleDto,
  CancelScheduleSDto,
  CreateScheduleDto,
  DuplicateScheduleDto,
  EditScheduleDto,
  ScheduleEvent,
  ScheduleResponse
} from "../../types/schedule"
import { apiWithTokenAndCenter } from "../api"
import { AxiosResponse } from "axios"

export const $getSchedules = async (
  start_date: string,
  end_date: string,
  lesson_ids?: number[]
): Promise<AxiosResponse<ScheduleResponse>> => {
  const response = await apiWithTokenAndCenter.get<ScheduleResponse>("/partners/schedules/", {
    params: {
      start_date,
      end_date,
      lesson_ids
    },
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams()

      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => {
            searchParams.append(key, val.toString())
          })
        } else if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString())
        }
      })

      return searchParams.toString()
    }
  })
  return response
}
export const $getScheduleById = async (id: number): Promise<AxiosResponse<ScheduleEvent>> => {
  const response = await apiWithTokenAndCenter.get<ScheduleEvent>(`/partners/schedules/${id}/`)
  return response
}

export const $createSchedule = async (
  data: CreateScheduleDto
): Promise<AxiosResponse<ScheduleEvent>> => {
  const response = await apiWithTokenAndCenter.post<ScheduleEvent>("/partners/schedules/", data)
  return response
}
export const $duplicateSchedule = async (
  data: DuplicateScheduleDto
): Promise<AxiosResponse<ScheduleEvent[]>> => {
  const response = await apiWithTokenAndCenter.post<ScheduleEvent[]>(
    "/partners/schedules/duplicate/",
    data
  )
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

// Отмена одного конкретного расписания
export const $cancelSchedule = async (
  data: CancelScheduleDto
): Promise<AxiosResponse<ScheduleEvent>> => {
  const response = await apiWithTokenAndCenter.post(`/partners/schedules/${data.id}/cancel/`, {
    cancel_reason: data.cancel_reason
  })
  return response
}
// Отмена нескольких расписаний
export const $cancelSchedules = async (data: CancelScheduleSDto): Promise<AxiosResponse<void>> => {
  const response = await apiWithTokenAndCenter.post("/partners/schedules/cancel-schedules/", data)
  return response
}
