export interface Lesson {
  id: number
  name: string
  center_id: number
  min_age_str: string
  max_age_str: string
}

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
  lesson: number
  start_timestamp: string
  end_timestamp: string
  places: number
}
