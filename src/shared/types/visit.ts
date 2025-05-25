import { Child } from "./child"
import { Lesson } from "./lesson"

export interface VisitScheduleModel {
  id: number
  start_timestamp: string
  end_timestamp: string
}
export enum LessonStateEnum {
  BOOKED = "BOOKED",
  MISSED = "MISSED",
  APPROVED = "APPROVED",
  CANCELED = "CANCELED"
}
export interface IVisit {
  id: number
  child: Child
  lesson: Lesson
  state: LessonStateEnum
  book_timestamp: string
  approve_timestamp: string | null
  cancelled_timestamp: string | null
  schedule?: VisitScheduleModel
}
export interface CancelVisitDto {
  visit_id: number
  cancel_reason: string
}
