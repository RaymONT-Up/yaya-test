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

export interface CancelScheduleDto {
  id: number
  cancel_reason: string
}

export enum DuplicateScheduleType {
  DAY = 'day',
  WEEK = 'week'
}
export interface DuplicateScheduleDto {
  duplicate_type: DuplicateScheduleType
  source_date: string
  target_dates: string[]
  lesson_ids: number[]
}

export interface CancelScheduleSDto {
  reason: string
  start_date: string
  end_date: string
  lessons: number[]
}
