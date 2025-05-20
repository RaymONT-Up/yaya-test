import { Child } from "./child"
import { Lesson } from "./lesson"

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
}
export interface CancelVisitDto {
  visit_id: number
  cancel_reason: string
}
