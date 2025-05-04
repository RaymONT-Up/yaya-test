import { Lesson } from './lesson'

export interface ScheduleEvent {
  id: number
  lesson: Lesson
  start_timestamp: string
  end_timestamp: string
  places: number
  booked_counts: number
  trainer: string
}

export interface ScheduleResponse {
  events: ScheduleEvent[]
  notes: string[]
}

export interface CreateScheduleDto {
  lesson_id: number
  day: string
  from_time: string
  to_time: string
  places: number
  trainer_id?: number
}
export interface EditScheduleDto {
  id: string
  places: number
  trainer_id: number
}
