import { Child } from "./child"
import { Lesson } from "./lesson"

export enum VisitCancelReasonEnum {
  TEACHER_SICK = "TEACHER_SICK",
  SCHEDULE_CANCELED = "SCHEDULE_CANCELED",
  USER_REQUESTED = "USER_REQUESTED",
  GROUP_OVERFLOW = "GROUP_OVERFLOW",
  OTHER = "OTHER"
}

export const cancelReasonsList: { label: string; value: VisitCancelReasonEnum }[] = [
  { label: "Преподаватель заболел", value: VisitCancelReasonEnum.TEACHER_SICK },
  { label: "Занятие отменено", value: VisitCancelReasonEnum.SCHEDULE_CANCELED },
  { label: "Пользователь попросил отменить", value: VisitCancelReasonEnum.USER_REQUESTED },
  { label: "Группа переполнена", value: VisitCancelReasonEnum.GROUP_OVERFLOW }
]

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
  cancel_reason: VisitCancelReasonEnum
  cancel_comment?: string
}
