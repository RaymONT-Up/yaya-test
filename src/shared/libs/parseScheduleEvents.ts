import { ScheduleEvent } from '@/shared/types/schedule'

export const parseScheduleEvents = (events: ScheduleEvent[]) => {
  return events.map((event) => ({
    id: String(event.id),
    title: `${event.lesson.name} | (${event.lesson.min_age_str} - ${event.lesson.max_age_str})`,
    start: event.start_timestamp,
    end: event.end_timestamp,
    extendedProps: {
      lesson: event.lesson,
      lesson_id: event.lesson.id,
      trainer: event.trainer,
      places: event.places,
      booked_counts: event.booked_counts
    }
  }))
}
